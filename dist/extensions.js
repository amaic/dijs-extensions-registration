"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCollection = void 0;
const dijs_1 = require("@amaic/dijs");
Object.defineProperty(exports, "ServiceCollection", { enumerable: true, get: function () { return dijs_1.ServiceCollection; } });
const dijs_abstractions_1 = require("@amaic/dijs-abstractions");
dijs_1.ServiceCollection.prototype.RegisterTransientClass = function (id, ct, ctr) {
    this.RegisterClass(dijs_abstractions_1.ServiceRegistrationMode.Single, dijs_abstractions_1.ServiceType.Transient, id, ct, ctr);
};
//# sourceMappingURL=extensions.js.map