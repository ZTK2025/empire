// firebase/profiles.js - VERSIÓN CORREGIDA
class ProfileSystem {
    constructor() {
        this.currentProfile = null;
        this.initFirebase();
    }

    initFirebase() {
        // Esperar a que Firebase se cargue
        if (typeof firebase === 'undefined') {
            console.error("Firebase no está cargado");
            return;
        }
        console.log("✅ Firebase listo en ProfileSystem");
    }

    // Crear perfil en Firebase
    async createProfile(profileName) {
        try {
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
                created: firebase.firestore.FieldValue.serverTimestamp(),
                lastPlayed: firebase.firestore.FieldValue.serverTimestamp()
            };

            const db = firebase.firestore();
            const docRef = await db.collection('profiles').add(profileData);
            console.log("✅ Perfil creado con ID:", docRef.id);
            
            const newProfile = { id: docRef.id, ...profileData };
            this.selectProfile(newProfile);
            return newProfile;
            
        } catch (error) {
            console.error("❌ Error creando perfil:", error);
            alert("Error creando perfil: " + error.message);
            throw error;
        }
    }

    // Cargar todos los perfiles
    async loadAllProfiles() {
        try {
            const db = firebase.firestore();
            const snapshot = await db.collection('profiles').get();
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
                    created: data.created
                });
            });
            
            console.log("✅ Perfiles cargados:", profiles.length);
            return profiles;
        } catch (error) {
            console.error("❌ Error cargando perfiles:", error);
            return [];
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
            const db = firebase.firestore();
            await db.collection('profiles').doc(profileId).update({
                ...newData,
                lastPlayed: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log("✅ Progreso guardado:", profileId);
        } catch (error) {
            console.error("❌ Error guardando progreso:", error);
        }
    }

    // Cargar datos específicos de un perfil
    async loadProfileData(profileId) {
        try {
            const db = firebase.firestore();
            const doc = await db.collection('profiles').doc(profileId).get();
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
            const db = firebase.firestore();
            await db.collection('profiles').doc(profileId).delete();
            console.log("✅ Perfil eliminado:", profileId);
            return true;
        } catch (error) {
            console.error("❌ Error eliminando perfil:", error);
            return false;
        }
    }
}
