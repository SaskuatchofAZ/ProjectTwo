module.exports = function(sequelize, DataTypes) {
  var Animal = sequelize.define("Animal", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    species: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true
    },
    age: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: true
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Animal.associate = function(models) {
    // We're saying that a Post should belong to an User
    // A Post can't be created without an User due to the foreign key constraint
    Animal.belongsToMany(models.User, {
      through: "AnimalUsers"
    });
    models.Animal.belongsToMany(models.IsGoodWith, {
      through: "AnimalsGoodWith"
    });
  };

  return Animal;
};
