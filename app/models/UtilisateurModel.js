const AppModel = require('./AppModel');

module.exports = class UtilisateurModel extends AppModel {
    
    schema = {
        idUtilisateur: { type: this.types.UUID, primaryKey: true, allowNull: false, defaultValue: this.sequelize.UUIDV4 },
        nom: { type: this.types.STRING, allowNull: false },
        prenom: { type: this.types.STRING, allowNull: false },
        email: { type: this.types.STRING, allowNull: false, unique: true },
        tel: { type: this.types.STRING, allowNull: false, unique: true },
        code: { type: this.types.STRING, allowNull: false, unique: true },
        mdp: { type: this.types.STRING, allowNull: false },
        genre: { type: this.types.STRING, allowNull: false },
        avatar: {
            type: this.types.STRING,
            allowNull: true,
            get() {
                const rawValue = this.getDataValue('avatar');
                if (empty(rawValue)) {
                    return `${baseUrl}/static/avatars/default.jpg`
                }
                return rawValue
            }
        },
        dateNaiss: this.types.DATEONLY,
        isCertified: { type: this.types.BOOLEAN, defaultValue: false },
        statutUtilisateur: { type: this.types.BOOLEAN, defaultValue: false }
    }

    modelName = 'Utilisateur'
    tableName = 'utilisateur'

    static associate(models) {

    }
}