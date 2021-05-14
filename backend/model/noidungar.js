const db = require('../utils/db');
module.exports = {
    addNoiDungAR: async (noiDungAR) => {
        const sql = `insert into NoiDungAR (ToaDoX,ToaDoY,ToaDoZ,XoayX,XoayY,XoayZ,TiLe,URL,MaDiemDanhDau,CapDo,DuocChon,filename,LaFile,LaTam)
        values(${noiDungAR.ToaDoX},${noiDungAR.ToaDoY},${noiDungAR.ToaDoZ},${noiDungAR.XoayX},${noiDungAR.XoayY},${noiDungAR.XoayZ},${noiDungAR.TiLe},"${noiDungAR.URL}",${noiDungAR.MaDiemDanhDau},${noiDungAR.CapDo}
        ,${noiDungAR.DuocChon},"${noiDungAR.filename}",${noiDungAR.LaFile},${noiDungAR.LaTam});`
        return await db.load(sql);
    },
    findByMaNoiDung: async (MaNoiDung) => {
        const sql = `select* from NoiDungAR where MaNoiDung = ${MaNoiDung}`
        return await db.load(sql);
    },
    addNoiDungARDuocChon: async (noiDungAR) => {
        const sql = `insert into NoiDungAR (ToaDoX,ToaDoY,ToaDoZ,XoayX,XoayY,XoayZ,TiLe,URL,MaDiemDanhDau,CapDo,DuocChon,filename,LaFile,LaTam)
        values(${noiDungAR.ToaDoX},${noiDungAR.ToaDoY},${noiDungAR.ToaDoZ},${noiDungAR.XoayX},${noiDungAR.XoayY},${noiDungAR.XoayZ},${noiDungAR.TiLe},"${noiDungAR.URL}",${noiDungAR.MaDiemDanhDau},${noiDungAR.CapDo}
        ,${noiDungAR.DuocChon},"${noiDungAR.filename}",${noiDungAR.LaFile},false);`
        return await db.load(sql);
    },
};