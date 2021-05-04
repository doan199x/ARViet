drop database if exists BaiGiangAR;
create database BaiGiangAR;
use BaiGiangAR;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456yugi';
create table HocSinh(
	MaHocSinh int not null auto_increment,
    Ten varchar(50),
    NgaySinh date,
    TenDangNhap varchar(50),
    MatKhau varchar(50),
    primary key(MaHocSinh)
);

create table GiaoVien(
	MaGiaoVien int not null auto_increment,
    Ten varchar(50),
    NgaySinh date,
	TenDangNhap varchar(50),
    Email varchar(50),
    MatKhau varchar(50),
    primary key (MaGiaoVien)
);

create table BaiGiang(
	MaBaiGiang int not null auto_increment,
    Ten varchar(50),
    MoTa varchar(200),
    ThoiGianTao datetime,
    ThoiGianCapNhat datetime,
    MaGiaoVien int,
    primary key (MaBaiGiang)
);

create table HocSinhBaiGiang(
	MaHocSinh int not null auto_increment,
    MaBaiGiang int,
    ThoiGianTao datetime,
    primary key (MaHocSinh,MaBaiGiang)
);

create table DiemDanhDau(
	MaDiemDanhDau int not null auto_increment,
    URL varchar(50),
    TiLe float,
    MaBaiGiang int,
    primary key (MaDiemDanhDau)
);

create table TuongTac(
	MaHanhDong int not null auto_increment,
    KieuTuongTac varchar(50),
    primary key (MaHanhDong)
);

create table HanhDong(
	MaHanhDong int not null auto_increment,
    NoiDung varchar(50),
    MaNoiDung int,
    primary key (MaHanhDong)
);

create table NoiDungAR(
	MaNoiDung int not null auto_increment,
    ToaDoX float,
    ToaDoY float,
    Xoay float,
    TiLe float,
    URL varchar(50),
    MaDiemDanhDau int,
    CapDo varchar(50),
    primary key (MaNoiDung)
);

create table NoiDungAR3D(
	MaNoiDung int not null auto_increment,
    ToaDoZ float,
    XoayX float,
    XoayY float,
    XoayZ float,
    xoayW float,
    primary key (MaNoiDung)
);

create table NoiDungARVanBan(
	MaNoiDung int not null auto_increment,
    NoiDungVanBan varchar(200),
    CoChu int,
    primary key (MaNoiDung)
);

create table NoiDungARCon(
	MaNoiDung int not null auto_increment,
	MaHanhDong int,
    primary key (MaNoiDung)
);

/*foreign key*/
alter table BaiGiang add constraint FK_BaiGiang_GiaoVien foreign key (MaGiaoVien) references GiaoVien(MaGiaoVien);
alter table HocSinhBaiGiang add constraint FK_HSBG_HocSinh foreign key (MaHocSinh) references HocSinh(MaHocSinh);
alter table HocSinhBaiGiang add constraint FK_HSBG_BaiGiang foreign key (MaBaiGiang) references BaiGiang(MaBaiGiang);
alter table DiemDanhDau add constraint FK_DiemDanhDau_BaiGiang foreign key (MaBaiGiang) references BaiGiang(MaBaiGiang);
alter table NoiDungAR add constraint FK_NoiDungAR_DiemDanhDau foreign key (MaDiemDanhDau) references DiemDanhDau(MaDiemDanhDau);
alter table HanhDong add constraint FK_HanhDong_NoiDung foreign key (MaNoiDung) references NoiDungAR(MaNoiDung);
alter table NoiDungARCon add constraint FK_NoiDungARCon_HanhDong foreign key (MaHanhDong) references HanhDong(MaHanhDong);

/*1-1 relationship*/
alter table NoiDungAR add constraint FK_NoiDungAR_NoiDungAR3D foreign key (MaNoiDung) references NoiDungAR3D(MaNoiDung);
alter table NoiDungAR3D add constraint FK_NoiDungAR3D_NoiDungAR foreign key(MaNoiDung) references NoiDungAR(MaNoiDung);

alter table NoiDungAR add constraint FK_NoiDungAR_NoiDungARVanBan foreign key (MaNoiDung) references NoiDungARVanBan(MaNoiDung);
alter table NoiDungARVanBan add constraint FK_NoiDungARVanBan_NoiDungAR foreign key (MaNoiDung) references NoiDungAR(MaNoiDung);

alter table NoiDungAR add constraint FK_NoiDungAR_NoiDungARCon foreign key (MaNoiDung) references NoiDungARCon(MaNoiDung);
alter table NoiDungARCon add constraint FK_NoiDungARCon_NoiDungAR foreign key (MaNoiDung) references NoiDungAR(MaNoiDung);

alter table HanhDong add constraint FK_HanhDong_TuongTac foreign key (MaHanhDong) references TuongTac(MaHanhDong);
alter table TuongTac add constraint FK_TuongTac_HanhDong foreign key (MaHanhDong) references HanhDong(MaHanhDong);

insert into GiaoVien(Ten,NgaySinh,TenDangNhap,Email,MatKHau) values('Nguyễn Văn An','1999-10-10','anan0234','anan123@gmail.com','123456');