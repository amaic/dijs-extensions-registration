import { ServiceCollection } from "@amaic/dijs";
import { IServiceProvider, ServiceConstructor, ServiceRegistrationMode, ServiceType } from "@amaic/dijs-abstractions";

declare module "@amaic/dijs-abstractions"
{
    interface IServiceCollection
    {
        /**
         * Register transient service with class constructor.
         * Throws exception if same interface identifier already exists.
         * @param interfaceIdentifier unique identifier of interface
         * @param classType type of service class
         * @param constructor optional constructor function; delivers type of service class, service provider and if named requested name
         */
        RegisterTransientClass<INTERFACE, CLASSTYPE extends ServiceConstructor<INTERFACE>>(
            interfaceIdentifier: symbol,
            classType: CLASSTYPE,
            constructor?: (classType: CLASSTYPE, serviceProvider: IServiceProvider) => INTERFACE
        ): void;

        /**
         * Registers transient service with class constructor.
         * Overwrites existing registrations for same interface identifier.
         * @param interfaceIdentifier unique identifier of interface
         * @param classType type of service class
         * @param constructor optional constructor function; delivers type of service class, service provider and if named requested name
         */
        OverwriteTransientClass<INTERFACE, CLASSTYPE extends ServiceConstructor<INTERFACE>>(
            interfaceIdentifier: symbol,
            classType: CLASSTYPE,
            constructor?: (classType: CLASSTYPE, serviceProvider: IServiceProvider) => INTERFACE
        ): void;

        /**
         * Registers transient service with class constructor.
         * Adds registration to already existing registrations.
         * @param interfaceIdentifier unique identifier of interface
         * @param classType type of service class
         * @param constructor optional constructor function; delivers type of service class, service provider and if named requested name
         */
        AddTransientClass<INTERFACE, CLASSTYPE extends ServiceConstructor<INTERFACE>>(
            interfaceIdentifier: symbol,
            classType: CLASSTYPE,
            constructor?: (classType: CLASSTYPE, serviceProvider: IServiceProvider) => INTERFACE
        ): void;


        /**
         * Register transient named service with class constructor.
         * @param interfaceIdentifier unique identifier of interface
         * @param classType type of service class
         * @param constructor optional constructor function; delivers type of service class, service provider and if named requested name
         */
        RegisterTransientNamedClass<INTERFACE, CLASSTYPE extends ServiceConstructor<INTERFACE>>(
            interfaceIdentifier: symbol,
            classType: CLASSTYPE,
            constructor?: (classType: CLASSTYPE, serviceProvider: IServiceProvider, name?: string) => INTERFACE
        ): void;

        /**
         * Register transient service with factory.
         * @param interfaceIdentifier unique identifier of interface
         * @param factory service factory function; delivers service provider and if named requested name
         */
        RegisterTransientFactory<INTERFACE>(
            interfaceIdentifier: symbol,
            factory: (serviceProvider: IServiceProvider) => INTERFACE
        ): void;

        /**
         * Register transient named service with factory.
         * @param interfaceIdentifier unique identifier of interface
         * @param factory service factory function; delivers service provider and if named requested name
         */
        RegisterTransientNamedFactory<INTERFACE>(
            interfaceIdentifier: symbol,
            factory: (serviceProvider: IServiceProvider, name?: string) => INTERFACE
        ): void;
    }

}

declare module "@amaic/dijs"
{
    interface ServiceCollection 
    {
        RegisterTransientClass<INTERFACE, CLASSTYPE extends ServiceConstructor<INTERFACE>>(
            interfaceIdentifier: symbol,
            classType: CLASSTYPE,
            constructor?: (classType: CLASSTYPE, serviceProvider: IServiceProvider) => INTERFACE
        ): void;

        OverwriteTransientClass<INTERFACE, CLASSTYPE extends ServiceConstructor<INTERFACE>>(
            interfaceIdentifier: symbol,
            classType: CLASSTYPE,
            constructor?: (classType: CLASSTYPE, serviceProvider: IServiceProvider) => INTERFACE
        ): void;

        AddTransientClass<INTERFACE, CLASSTYPE extends ServiceConstructor<INTERFACE>>(
            interfaceIdentifier: symbol,
            classType: CLASSTYPE,
            constructor?: (classType: CLASSTYPE, serviceProvider: IServiceProvider) => INTERFACE
        ): void;


        RegisterTransientNamedClass<INTERFACE, CLASSTYPE extends ServiceConstructor<INTERFACE>>(
            interfaceIdentifier: symbol,
            classType: CLASSTYPE,
            constructor?: (classType: CLASSTYPE, serviceProvider: IServiceProvider, name?: string) => INTERFACE
        ): void;

        RegisterTransientFactory<INTERFACE>(
            interfaceIdentifier: symbol,
            factory: (serviceProvider: IServiceProvider) => INTERFACE
        ): void;

        RegisterTransientNamedFactory<INTERFACE>(
            interfaceIdentifier: symbol,
            factory: (serviceProvider: IServiceProvider, name?: string) => INTERFACE
        ): void;
    }
}

ServiceCollection.prototype.RegisterTransientClass = function (id, ct, ctor)
{
    this.RegisterClass(ServiceRegistrationMode.Single, ServiceType.Transient, id, ct, ctor);
};
ServiceCollection.prototype.OverwriteTransientClass = function (id, ct, ctor)
{
    this.RegisterClass(ServiceRegistrationMode.Overwrite, ServiceType.Transient, id, ct, ctor);
};
ServiceCollection.prototype.AddTransientClass = function (id, ct, ctor)
{
    this.RegisterClass(ServiceRegistrationMode.Multiple, ServiceType.Transient, id, ct, ctor);
};

ServiceCollection.prototype.RegisterTransientNamedClass = function (id, ct, ctor)
{    
    this.RegisterClass(ServiceRegistrationMode.Single, ServiceType.TransientNamed, id, ct, ctor);
};

ServiceCollection.prototype.RegisterTransientFactory = function (id, factory)
{
    this.RegisterFactory(ServiceRegistrationMode.Single, ServiceType.Transient, id, factory);
};

ServiceCollection.prototype.RegisterTransientNamedFactory = function (id, factory)
{
    this.RegisterFactory(ServiceRegistrationMode.Single, ServiceType.TransientNamed, id, factory);
};

export { ServiceCollection };