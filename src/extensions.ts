import { ServiceCollection } from "@amaic/dijs";
import { IServiceProvider, ServiceConstructor, ServiceRegistrationMode, ServiceType } from "@amaic/dijs-abstractions";

declare module "@amaic/dijs"
{
    interface ServiceCollection
    {
        RegisterTransientClass<INTERFACE, CLASSTYPE extends ServiceConstructor<INTERFACE>>(
            interfaceIdentifier: symbol,
            classType: CLASSTYPE,
            constructor?: (classType: CLASSTYPE, serviceProvider: IServiceProvider) => INTERFACE
        ): void;
    }
}

ServiceCollection.prototype.RegisterTransientClass = function (id, ct, ctr)
{
    this.RegisterClass(ServiceRegistrationMode.Single, ServiceType.Transient, id, ct, ctr);
};

export { ServiceCollection };