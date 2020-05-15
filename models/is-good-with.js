module.exports = function(sequelize, DataTypes) {
  var IsGoodWith = sequelize.define("IsGoodWith", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  IsGoodWith.associate = function(models) {
    // We're saying that a Post should belong to an User
    // A Post can't be created without an User due to the foreign key constraint
    models.IsGoodWith.belongsToMany(models.Animal, {
      through: "AnimalsGoodWith"
    });
  };

  return IsGoodWith;
};
