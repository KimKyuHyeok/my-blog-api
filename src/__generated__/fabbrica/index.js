"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineBoardFactory = exports.defineCategoryFactory = exports.initialize = exports.resetScalarFieldValueGenerator = exports.registerScalarFieldValueGenerator = exports.resetSequence = void 0;
const internal_1 = require("@quramy/prisma-fabbrica/lib/internal");
var internal_2 = require("@quramy/prisma-fabbrica/lib/internal");
Object.defineProperty(exports, "resetSequence", { enumerable: true, get: function () { return internal_2.resetSequence; } });
Object.defineProperty(exports, "registerScalarFieldValueGenerator", { enumerable: true, get: function () { return internal_2.registerScalarFieldValueGenerator; } });
Object.defineProperty(exports, "resetScalarFieldValueGenerator", { enumerable: true, get: function () { return internal_2.resetScalarFieldValueGenerator; } });
const initializer = (0, internal_1.createInitializer)();
const { getClient } = initializer;
exports.initialize = initializer.initialize;
const modelFieldDefinitions = [{
        name: "Category",
        fields: [{
                name: "Board",
                type: "Board",
                relationName: "BoardToCategory"
            }]
    }, {
        name: "Board",
        fields: [{
                name: "category",
                type: "Category",
                relationName: "BoardToCategory"
            }]
    }];
function autoGenerateCategoryScalarsOrEnums({ seq }) {
    return {
        name: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Category", fieldName: "name", isId: false, isUnique: false, seq })
    };
}
function defineCategoryFactoryInternal({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }, defaultTransientFieldValues) {
    const getFactoryWithTraits = (traitKeys = []) => {
        const seqKey = {};
        const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
        const screen = (0, internal_1.createScreener)("Category", modelFieldDefinitions);
        const handleAfterBuild = (0, internal_1.createCallbackChain)([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = (0, internal_1.createCallbackChain)([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = (0, internal_1.createCallbackChain)([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateCategoryScalarsOrEnums({ seq });
            const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
            const [transientFields, filteredInputData] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = (0, internal_1.normalizeResolver)(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {};
            const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => build(data)));
        const pickForConnect = (inputData) => ({
            id: inputData.id
        });
        const create = async (inputData = {}) => {
            const data = await build({ ...inputData }).then(screen);
            const [transientFields] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient().category.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => create(data)));
        const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Category",
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name, ...names) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}
exports.defineCategoryFactory = ((options) => {
    return defineCategoryFactoryInternal(options ?? {}, {});
});
exports.defineCategoryFactory.withTransientFields = defaultTransientFieldValues => options => defineCategoryFactoryInternal(options ?? {}, defaultTransientFieldValues);
function isBoardcategoryFactory(x) {
    return x?._factoryFor === "Category";
}
function autoGenerateBoardScalarsOrEnums({ seq }) {
    return {
        title: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Board", fieldName: "title", isId: false, isUnique: false, seq }),
        content: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Board", fieldName: "content", isId: false, isUnique: false, seq })
    };
}
function defineBoardFactoryInternal({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }, defaultTransientFieldValues) {
    const getFactoryWithTraits = (traitKeys = []) => {
        const seqKey = {};
        const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
        const screen = (0, internal_1.createScreener)("Board", modelFieldDefinitions);
        const handleAfterBuild = (0, internal_1.createCallbackChain)([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = (0, internal_1.createCallbackChain)([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = (0, internal_1.createCallbackChain)([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateBoardScalarsOrEnums({ seq });
            const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver);
            const [transientFields, filteredInputData] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = (0, internal_1.normalizeResolver)(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {
                category: isBoardcategoryFactory(defaultData.category) ? {
                    create: await defaultData.category.build()
                } : defaultData.category
            };
            const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => build(data)));
        const pickForConnect = (inputData) => ({
            id: inputData.id
        });
        const create = async (inputData = {}) => {
            const data = await build({ ...inputData }).then(screen);
            const [transientFields] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient().board.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => create(data)));
        const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Board",
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name, ...names) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}
exports.defineBoardFactory = ((options) => {
    return defineBoardFactoryInternal(options, {});
});
exports.defineBoardFactory.withTransientFields = defaultTransientFieldValues => options => defineBoardFactoryInternal(options, defaultTransientFieldValues);
