import { ServiceCollection } from "@amaic/dijs";
import { IServiceProvider, ServiceConstructor } from "@amaic/dijs-abstractions";
declare module "@amaic/dijs" {
    interface ServiceCollection {
        /**
         * Register transient service with class constructor.
         * @param interfaceIdentifier unique identifier of interface
         * @param classType type of service class
         * @param constructor optional constructor function; delivers type of service class, service provider and if named requested name
         */
        RegisterTransientClass<INTERFACE, CLASSTYPE extends ServiceConstructor<INTERFACE>>(interfaceIdentifier: symbol, classType: CLASSTYPE, constructor?: (classType: CLASSTYPE, serviceProvider: IServiceProvider) => INTERFACE): void;
        /**
         * Register transient service with factory.
         * @param interfaceIdentifier unique identifier of interface
         * @param factory service factory function; delivers service provider and if named requested name
         */
        RegisterTransientFactory<INTERFACE>(interfaceIdentifier: symbol, factory: (serviceProvider: IServiceProvider) => INTERFACE): void;
    }
}
export { ServiceCollection };
