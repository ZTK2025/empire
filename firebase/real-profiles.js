// firebase/real-profiles.js
class RealProfileSystem {
    constructor() {
        this.currentProfile = null;
    }

    // Crear perfil en Firebase
    async createProfile(profileName) {
        try {
            const profileData = {
                name: profileName,
                level: 1,
                resources: 1000,
                base: {
                    buildings: [],
                    defenses: []
                },
                army: {
                    units: [],
                    level: 1
                },
                created: firebase.firestore.FieldValue.serverTimestamp(),
                lastPlayed: firebase.firestore.FieldValue.serverTimestamp()
            };

            // Guardar en Firestore
            const docRef = await db.collection('profiles').add(profileData);
            
            console.log("Perfil creado con ID:", docRef.id);
            return { id: docRef.id, ...profileData };
            
        } catch (error) {
            console.error("Error creando perfil:", error);
            throw error;
        }
    }

    // Cargar todos los perfiles
    async loadAllProfiles() {
        try {
            const snapshot = await db.collection('profiles').get();
            const profiles = [];
            
            snapshot.forEach(doc => {
                profiles.push({ id: doc.id, ...doc.data() });
            });
            
            return profiles;
        } catch (error) {
            console.error("Error cargando perfiles:", error);
            return [];
        }
    }

    // Seleccionar perfil (guardar en localStorage temporal)
    selectProfile(profile) {
        this.currentProfile = profile;
        localStorage.setItem('selectedProfile', JSON.stringify(profile));
        console.log("Perfil seleccionado:", profile.name);
    }

    // Obtener perfil seleccionado
    getSelectedProfile() {
        const saved = localStorage.getItem('selectedProfile');
        return saved ? JSON.parse(saved) : null;
    }

    // Actualizar datos del perfil en Firebase
    async updateProfile(profileId, newData) {
        try {
            await db.collection('profiles').doc(profileId).update({
                ...newData,
                lastPlayed: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log("Perfil actualizado:", profileId);
        } catch (error) {
            console.error("Error actualizando perfil:", error);
        }
    }

    // Cargar datos específicos de un perfil
    async loadProfileData(profileId) {
        try {
            const doc = await db.collection('profiles').doc(profileId).get();
            if (doc.exists) {
                return { id: doc.id, ...doc.data() };
            }
            return null;
        } catch (error) {
            console.error("Error cargando datos del perfil:", error);
            return null;
        }
    }
}
