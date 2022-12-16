import { ServiceCollection } from "@amaic/dijs";
import "../src";

describe("extensions", () =>
{
    test("register transient service with class", () =>
    {
        const serviceCollection = new ServiceCollection();

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
        const serviceCollection = new ServiceCollection();

        serviceCollection.RegisterTransientFactory<IFoo>(IFooIdentifier, sp => new Foo());

        serviceCollection.RegisterTransientFactory<IBar>(IBarIdentifier, sp => new Bar(sp.GetRequiredService<IFoo>(IFooIdentifier)));

        const serviceProvider = serviceCollection.CreateServiceProvider();

        const bar = serviceProvider.GetRequiredService<IBar>(IBarIdentifier);

        expect(bar).toBeInstanceOf(Bar);

        expect(bar.BarTest()).toBe("bar");

        expect(bar.Foo).toBeInstanceOf(Foo);

        expect(bar.Foo.FooTest()).toBe("foo");
    });
});

const IFooIdentifier = Symbol();
interface IFoo
{
    FooTest(): string;
}
class Foo implements IFoo
{
    FooTest(): string
    {
        return "foo";
    }

}

const IBarIdentifier = Symbol();
interface IBar
{
    BarTest(): string;

    get Foo(): IFoo;
}
class Bar implements IBar
{
    constructor(foo: IFoo) 
    {
        this.Foo = foo;
    }

    public readonly Foo: IFoo;

    BarTest(): string
    {
        return "bar";
    }
}
