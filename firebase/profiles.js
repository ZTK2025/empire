// firebase/profiles.js
class ProfileSystem {
    constructor() {
        this.currentProfile = null;
        this.db = null;
        this.initFirebase();
    }

    initFirebase() {
        try {
            if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
                this.db = firebase.firestore();
                console.log("✅ Firestore inicializado correctamente");
            } else {
                console.warn("⚠️ Firebase no está listo, reintentando...");
                setTimeout(() => this.initFirebase(), 1000);
            }
        } catch (error) {
            console.error("❌ Error inicializando Firestore:", error);
        }
    }

    // Verificar si Firestore está listo
    async ensureFirestoreReady() {
        if (!this.db) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (!this.db) {
                throw new Error("Firestore no está disponible");
            }
        }
    }

    // Crear perfil en Firebase
    async createProfile(profileName) {
        try {
            await this.ensureFirestoreReady();
            
            const profileData = {
                name: profileName,
                level: 1,
                resources: 1000,
                gold: 500,
                oil: 500,
                soldiers: 50,
                base: {
                    headquarters: 1,
                    barracks: 0,
                    refinery: 0,
                    factory: 0
                },
                created: new Date().toISOString(),
                lastPlayed: new Date().toISOString()
            };

            const docRef = await this.db.collection('profiles').add(profileData);
            console.log("✅ Perfil creado con ID:", docRef.id);
            
            const newProfile = { 
                id: docRef.id, 
                ...profileData 
            };
            
            this.selectProfile(newProfile);
            return newProfile;
            
        } catch (error) {
            console.error("❌ Error creando perfil:", error);
            let errorMessage = "Error creando perfil";
            
            if (error.code === 'permission-denied') {
                errorMessage = "❌ Error de permisos: Configura las reglas de Firestore";
            } else if (error.code === 'unavailable') {
                errorMessage = "❌ Error de conexión: Verifica tu internet";
            }
            
            alert(errorMessage + "\n\nDetalles: " + error.message);
            throw error;
        }
    }

    // Cargar todos los perfiles
    async loadAllProfiles() {
        try {
            await this.ensureFirestoreReady();
            
            const snapshot = await this.db.collection('profiles').get();
            const profiles = [];
            
            snapshot.forEach(doc => {
                const data = doc.data();
                profiles.push({ 
                    id: doc.id, 
                    name: data.name,
                    level: data.level || 1,
                    resources: data.resources || 1000,
                    gold: data.gold || 500,
                    oil: data.oil || 500,
                    soldiers: data.soldiers || 50,
                    created: data.created || new Date().toISOString()
                });
            });
            
            console.log("✅ Perfiles cargados:", profiles.length);
            return profiles;
        } catch (error) {
            console.error("❌ Error cargando perfiles:", error);
            
            let errorMessage = "Error cargando perfiles";
            if (error.code === 'permission-denied') {
                errorMessage = "❌ Configura las reglas de Firestore:\n1. Ve a Firebase Console\n2. Firestore Database → Reglas\n3. Reemplaza con: allow read, write: if true;\n4. Publica las reglas";
            }
            
            throw new Error(errorMessage);
        }
    }

    // Seleccionar perfil
    selectProfile(profile) {
        this.currentProfile = profile;
        localStorage.setItem('selectedProfile', JSON.stringify(profile));
        console.log("✅ Perfil seleccionado:", profile.name);
    }

    // Obtener perfil seleccionado
    getSelectedProfile() {
        const saved = localStorage.getItem('selectedProfile');
        return saved ? JSON.parse(saved) : null;
    }

    // Actualizar datos del perfil
    async updateProfile(profileId, newData) {
        try {
            await this.ensureFirestoreReady();
            
            await this.db.collection('profiles').doc(profileId).update({
                ...newData,
                lastPlayed: new Date().toISOString()
            });
            console.log("✅ Progreso guardado:", profileId);
        } catch (error) {
            console.error("❌ Error guardando progreso:", error);
        }
    }

    // Cargar datos específicos de un perfil
    async loadProfileData(profileId) {
        try {
            await this.ensureFirestoreReady();
            
            const doc = await this.db.collection('profiles').doc(profileId).get();
            if (doc.exists) {
                return { id: doc.id, ...doc.data() };
            }
            return null;
        } catch (error) {
            console.error("❌ Error cargando perfil:", error);
            return null;
        }
    }

    // Eliminar perfil
    async deleteProfile(profileId) {
        try {
            await this.ensureFirestoreReady();
            
            await this.db.collection('profiles').doc(profileId).delete();
            console.log("✅ Perfil eliminado:", profileId);
            return true;
        } catch (error) {
            console.error("❌ Error eliminando perfil:", error);
            return false;
        }
    }
}
