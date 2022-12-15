import { ServiceCollection } from "@amaic/dijs";
import { IServiceProvider, ServiceConstructor } from "@amaic/dijs-abstractions";
declare module "@amaic/dijs" {
    interface ServiceCollection {
        RegisterTransientClass<INTERFACE, CLASSTYPE extends ServiceConstructor<INTERFACE>>(interfaceIdentifier: symbol, classType: CLASSTYPE, constructor?: (classType: CLASSTYPE, serviceProvider: IServiceProvider) => INTERFACE): void;
    }
}
export { ServiceCollection };
