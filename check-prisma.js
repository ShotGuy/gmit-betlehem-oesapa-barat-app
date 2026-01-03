const { Prisma } = require('@prisma/client');
try {
    const dmmf = Prisma.dmmf;
    const majelis = dmmf.datamodel.models.find(m => m.name === 'Majelis');
    console.log("HAS_ID_JEMAAT:", majelis.fields.some(f => f.name === 'idJemaat'));
    console.log("HAS_JEMAAT_ID:", majelis.fields.some(f => f.name === 'jemaatId'));
} catch (e) {
    console.error(e);
}
