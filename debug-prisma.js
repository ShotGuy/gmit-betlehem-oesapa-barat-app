const { Prisma } = require('@prisma/client');

console.log("Checking Prisma Client DMMF...");
try {
    const dmmf = Prisma.dmmf;
    if (!dmmf) {
        console.log("DMMF not found on Prisma object");
        console.log("Keys on Prisma:", Object.keys(Prisma));
    } else {
        const majelis = dmmf.datamodel.models.find(m => m.name === 'Majelis');
        if (majelis) {
            console.log("Majelis fields:", majelis.fields.map(f => f.name));
        } else {
            console.log("Majelis model not found in DMMF");
        }
    }
} catch (e) {
    console.error("Error inspecting DMMF:", e);
}
