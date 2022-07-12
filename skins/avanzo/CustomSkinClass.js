/**
 * @class CustomSkinClass Miembro que se convertirá en una clase al crear el skin.
 * El skin debe ser una clase CustomSkinClass, y se pueden tener funcionalidades
 * personalizadas siempre bajo la interfaz de CustomSkinClass
 * 
 * El player disparará los eventos dentro de esta clase.
*/

var nameSpace = nameSpace || {};
(function (nameSpace) {
    nameSpace.CustomSkinClass = function (_self) {

        nameSpace.SkinClass.call(this, _self);
        

    };
})(nameSpace);








