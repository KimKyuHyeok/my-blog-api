import type { Category } from "@prisma/client";
import type { Board } from "@prisma/client";
import type { Prisma } from "@prisma/client";
import type { Resolver } from "@quramy/prisma-fabbrica/lib/internal";
export { resetSequence, registerScalarFieldValueGenerator, resetScalarFieldValueGenerator } from "@quramy/prisma-fabbrica/lib/internal";
type BuildDataOptions<TTransients extends Record<string, unknown>> = {
    readonly seq: number;
} & TTransients;
type TraitName = string | symbol;
type CallbackDefineOptions<TCreated, TCreateInput, TTransients extends Record<string, unknown>> = {
    onAfterBuild?: (createInput: TCreateInput, transientFields: TTransients) => void | PromiseLike<void>;
    onBeforeCreate?: (createInput: TCreateInput, transientFields: TTransients) => void | PromiseLike<void>;
    onAfterCreate?: (created: TCreated, transientFields: TTransients) => void | PromiseLike<void>;
};
export declare const initialize: (options: import("@quramy/prisma-fabbrica/lib/initialize").InitializeOptions) => void;
type CategoryFactoryDefineInput = {
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
    Board?: Prisma.BoardCreateNestedManyWithoutCategoryInput;
};
type CategoryTransientFields = Record<string, unknown> & Partial<Record<keyof CategoryFactoryDefineInput, never>>;
type CategoryFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<CategoryFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Category, Prisma.CategoryCreateInput, TTransients>;
type CategoryFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData?: Resolver<CategoryFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: TraitName]: CategoryFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Category, Prisma.CategoryCreateInput, TTransients>;
type CategoryTraitKeys<TOptions extends CategoryFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface CategoryFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Category";
    build(inputData?: Partial<Prisma.CategoryCreateInput & TTransients>): PromiseLike<Prisma.CategoryCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.CategoryCreateInput & TTransients>): PromiseLike<Prisma.CategoryCreateInput>;
    buildList(list: readonly Partial<Prisma.CategoryCreateInput & TTransients>[]): PromiseLike<Prisma.CategoryCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.CategoryCreateInput & TTransients>): PromiseLike<Prisma.CategoryCreateInput[]>;
    pickForConnect(inputData: Category): Pick<Category, "id">;
    create(inputData?: Partial<Prisma.CategoryCreateInput & TTransients>): PromiseLike<Category>;
    createList(list: readonly Partial<Prisma.CategoryCreateInput & TTransients>[]): PromiseLike<Category[]>;
    createList(count: number, item?: Partial<Prisma.CategoryCreateInput & TTransients>): PromiseLike<Category[]>;
    createForConnect(inputData?: Partial<Prisma.CategoryCreateInput & TTransients>): PromiseLike<Pick<Category, "id">>;
}
export interface CategoryFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends CategoryFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): CategoryFactoryInterfaceWithoutTraits<TTransients>;
}
interface CategoryFactoryBuilder {
    <TOptions extends CategoryFactoryDefineOptions>(options?: TOptions): CategoryFactoryInterface<{}, CategoryTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends CategoryTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends CategoryFactoryDefineOptions<TTransients>>(options?: TOptions) => CategoryFactoryInterface<TTransients, CategoryTraitKeys<TOptions>>;
}
export declare const defineCategoryFactory: CategoryFactoryBuilder;
type BoardcategoryFactory = {
    _factoryFor: "Category";
    build: () => PromiseLike<Prisma.CategoryCreateNestedOneWithoutBoardInput["create"]>;
};
type BoardFactoryDefineInput = {
    title?: string;
    content?: string;
    views?: number;
    deleteYn?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    category: BoardcategoryFactory | Prisma.CategoryCreateNestedOneWithoutBoardInput;
};
type BoardTransientFields = Record<string, unknown> & Partial<Record<keyof BoardFactoryDefineInput, never>>;
type BoardFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<BoardFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Board, Prisma.BoardCreateInput, TTransients>;
type BoardFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<BoardFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: BoardFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Board, Prisma.BoardCreateInput, TTransients>;
type BoardTraitKeys<TOptions extends BoardFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface BoardFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Board";
    build(inputData?: Partial<Prisma.BoardCreateInput & TTransients>): PromiseLike<Prisma.BoardCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.BoardCreateInput & TTransients>): PromiseLike<Prisma.BoardCreateInput>;
    buildList(list: readonly Partial<Prisma.BoardCreateInput & TTransients>[]): PromiseLike<Prisma.BoardCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.BoardCreateInput & TTransients>): PromiseLike<Prisma.BoardCreateInput[]>;
    pickForConnect(inputData: Board): Pick<Board, "id">;
    create(inputData?: Partial<Prisma.BoardCreateInput & TTransients>): PromiseLike<Board>;
    createList(list: readonly Partial<Prisma.BoardCreateInput & TTransients>[]): PromiseLike<Board[]>;
    createList(count: number, item?: Partial<Prisma.BoardCreateInput & TTransients>): PromiseLike<Board[]>;
    createForConnect(inputData?: Partial<Prisma.BoardCreateInput & TTransients>): PromiseLike<Pick<Board, "id">>;
}
export interface BoardFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends BoardFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): BoardFactoryInterfaceWithoutTraits<TTransients>;
}
interface BoardFactoryBuilder {
    <TOptions extends BoardFactoryDefineOptions>(options: TOptions): BoardFactoryInterface<{}, BoardTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends BoardTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends BoardFactoryDefineOptions<TTransients>>(options: TOptions) => BoardFactoryInterface<TTransients, BoardTraitKeys<TOptions>>;
}
export declare const defineBoardFactory: BoardFactoryBuilder;
