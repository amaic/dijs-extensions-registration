"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCollection = void 0;
const dijs_1 = require("@amaic/dijs");
Object.defineProperty(exports, "ServiceCollection", { enumerable: true, get: function () { return dijs_1.ServiceCollection; } });
const dijs_abstractions_1 = require("@amaic/dijs-abstractions");
dijs_1.ServiceCollection.prototype.RegisterTransientClass = function (id, ct, ctor) {
    this.RegisterClass(dijs_abstractions_1.ServiceRegistrationMode.Single, dijs_abstractions_1.ServiceType.Transient, id, ct, ctor);
};
dijs_1.ServiceCollection.prototype.OverwriteTransientClass = function (id, ct, ctor) {
    this.RegisterClass(dijs_abstractions_1.ServiceRegistrationMode.Overwrite, dijs_abstractions_1.ServiceType.Transient, id, ct, ctor);
};
dijs_1.ServiceCollection.prototype.AddTransientClass = function (id, ct, ctor) {
    this.RegisterClass(dijs_abstractions_1.ServiceRegistrationMode.Multiple, dijs_abstractions_1.ServiceType.Transient, id, ct, ctor);
};
dijs_1.ServiceCollection.prototype.RegisterTransientNamedClass = function (id, ct, ctor) {
    this.RegisterClass(dijs_abstractions_1.ServiceRegistrationMode.Single, dijs_abstractions_1.ServiceType.TransientNamed, id, ct, ctor);
};
dijs_1.ServiceCollection.prototype.RegisterTransientFactory = function (id, factory) {
    this.RegisterFactory(dijs_abstractions_1.ServiceRegistrationMode.Single, dijs_abstractions_1.ServiceType.Transient, id, factory);
};
dijs_1.ServiceCollection.prototype.RegisterTransientNamedFactory = function (id, factory) {
    this.RegisterFactory(dijs_abstractions_1.ServiceRegistrationMode.Single, dijs_abstractions_1.ServiceType.TransientNamed, id, factory);
};
//# sourceMappingURL=extensions.js.map