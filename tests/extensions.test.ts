import { ServiceCollection } from "@amaic/dijs";
import { IServiceCollection } from "@amaic/dijs-abstractions";
import "../src";

describe("extensions", () =>
{
    test("register transient service with class", () =>
    {
        const serviceCollection: IServiceCollection = new ServiceCollection();

        serviceCollection.RegisterTransientClass<IFoo, typeof Foo>(IFooIdentifier, Foo);

        serviceCollection.RegisterTransientClass<IBar, typeof Bar>(IBarIdentifier, Bar, (ct, sp) =>
            new ct(sp.GetRequiredService<IFoo>(IFooIdentifier))
        );

        const serviceProvider = serviceCollection.CreateServiceProvider();

        const bar = serviceProvider.GetRequiredService<IBar>(IBarIdentifier);

        expect(bar).toBeInstanceOf(Bar);

        expect(bar.BarTest()).toBe("bar");

        expect(bar.Foo).toBeInstanceOf(Foo);

        expect(bar.Foo.FooTest()).toBe("foo");
    });

    test("register transient service with factory", () =>
    {
        const serviceCollection: IServiceCollection = new ServiceCollection();

        serviceCollection.RegisterTransientFactory<IFoo>(IFooIdentifier, sp => new Foo());

        serviceCollection.RegisterTransientFactory<IBar>(IBarIdentifier, sp => new Bar(sp.GetRequiredService<IFoo>(IFooIdentifier)));

        const serviceProvider = serviceCollection.CreateServiceProvider();

        const bar = serviceProvider.GetRequiredService<IBar>(IBarIdentifier);

        expect(bar).toBeInstanceOf(Bar);

        expect(bar.BarTest()).toBe("bar");

        expect(bar.Foo).toBeInstanceOf(Foo);

        expect(bar.Foo.FooTest()).toBe("foo");
    });

    test("register transient named service with class", () =>
    {
        const serviceCollection: IServiceCollection = new ServiceCollection();

        serviceCollection.RegisterTransientNamedClass<IFoo, typeof Foo>(IFooIdentifier, Foo, (ct, sp, name) =>
            new ct(name)
        );

        serviceCollection.RegisterTransientNamedClass<IBar, typeof Bar>(IBarIdentifier, Bar, (ct, sp, name) =>
            new ct(sp.GetRequiredService<IFoo>(IFooIdentifier, name), name)
        );

        const serviceProvider = serviceCollection.CreateServiceProvider();

        const bar = serviceProvider.GetRequiredService<IBar>(IBarIdentifier, "test");

        expect(bar).toBeInstanceOf(Bar);

        expect(bar.BarTest()).toBe("bar");

        expect(bar.Name).toBe("test");

        expect(bar.Foo).toBeInstanceOf(Foo);

        expect(bar.Foo.FooTest()).toBe("foo");

        expect(bar.Foo.Name).toBe("test");
    });

    test("register transient named service with factory", () =>
    {
        const serviceCollection: IServiceCollection = new ServiceCollection();

        serviceCollection.RegisterTransientNamedFactory<IFoo>(IFooIdentifier, (sp, name) => new Foo(name));

        serviceCollection.RegisterTransientNamedFactory<IBar>(IBarIdentifier, (sp, name) => new Bar(sp.GetRequiredService<IFoo>(IFooIdentifier, name), name));

        const serviceProvider = serviceCollection.CreateServiceProvider();

        const bar = serviceProvider.GetRequiredService<IBar>(IBarIdentifier, "test");

        expect(bar).toBeInstanceOf(Bar);

        expect(bar.BarTest()).toBe("bar");

        expect(bar.Name).toBe("test");

        expect(bar.Foo).toBeInstanceOf(Foo);

        expect(bar.Foo.FooTest()).toBe("foo");

        expect(bar.Foo.Name).toBe("test");
    });
});

const IFooIdentifier = Symbol();
interface IFoo
{
    get Name(): string | undefined;

    FooTest(): string;
}
class Foo implements IFoo
{
    constructor(name?: string)
    {
        this.Name = name;
    }

    public readonly Name: string | undefined;

    public FooTest(): string
    {
        return "foo";
    }

}

const IBarIdentifier = Symbol();
interface IBar
{
    get Name(): string | undefined;

    BarTest(): string;

    get Foo(): IFoo;
}
class Bar implements IBar
{
    constructor(foo: IFoo, name?: string) 
    {
        this.Foo = foo;
        this.Name = name;
    }

    public readonly Foo: IFoo;

    public readonly Name: string | undefined;

    public BarTest(): string
    {
        return "bar";
    }
}
