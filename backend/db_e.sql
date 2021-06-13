drop database if exists BaiGiangAR;
create database BaiGiangAR;
use BaiGiangAR;
SET SQL_SAFE_UPDATES = 0;
/* ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123@'; */
create table Student(
	studentID int not null auto_increment,
    name varchar(50),
    dateOfBirth date,
    username varchar(50),
    password varchar(200),
    primary key(studentID)
);

create table Teacher(
	teacherID int not null auto_increment,
    name varchar(50),
    iNumber varchar(12),
    email varchar(50),
    password varchar(50),
    primary key (teacherID)
);

create table Lesson(
	lessonID int not null auto_increment,
    name varchar(50),
    description varchar(200),
    timeCreated datetime,
    timeUpdated datetime,
    teacherID int,
    primary key (lessonID)
);

create table StudentLesson(
	studentID int not null auto_increment,
    lessonID int,
    timeCreated datetime,
    primary key (studentID,lessonID)
);

create table Marker(
	markerID int not null auto_increment,
    URL varchar(200),
    scale float,
    lessonID int,
    filename varchar(200),
    primary key (markerID)
);

create table Interaction(
	actionID int not null auto_increment,
    interactionName varchar(50),
    primary key (actionID)
);

create table Action(
	actionID int not null auto_increment,
    name varchar(50),
    markerID int,
    primary key (actionID)
);

create table ARContent(
	contentID int not null auto_increment,
    xPosition float,
    yPosition float,
    zPosition float,
    xRotation float,
    yRotation float,
    zRotation float,
    xScale float,
    yScale float,
    zScale float,
    URL varchar(200),
    actionID int,
    filename varchar(200),
    isFile boolean,
    isTemp boolean,
    isChoosen boolean default false,
    primary key (contentID)
);
create table TextARContent(
	contentID int not null auto_increment,
    text varchar(200),
    font varchar(200),
    size int,
    color varchar(200),
    backgroundColor varchar(200),
    isTransparent bool,
    primary key (contentID)
);

/*foreign key*/
alter table Lesson add constraint FK_Lesson_Teacher foreign key (teacherID) references Teacher(teacherID);
alter table StudentLesson add constraint FK_Student_Lesson_Student foreign key (studentID) references Student(studentID);
alter table StudentLesson add constraint  FK_Student_Lesson_Lesson foreign key (lessonID) references Lesson(lessonID) ON DELETE CASCADE;
alter table Marker add constraint FK_Marker_Lesson foreign key (lessonID) references Lesson(lessonID) ON DELETE CASCADE;
alter table ARContent add constraint FK_ARContent_Action foreign key (actionID) references Action(actionID)ON DELETE CASCADE;
alter table Action add constraint FK_Action_Marker foreign key (markerID) references marker(markerID) ON DELETE CASCADE;

/*1-1 relationship*/
/*
alter table TextARContent add constraint FK_TextARContent_ARContent foreign key (contentID) references ARContent(contentID) ON DELETE CASCADE;

alter table Interaction add constraint FK_Interaction_Action foreign key (actionID) references Action(actionID) ON DELETE CASCADE;
*/
/*root*/
/* ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123@'; */

insert into Teacher(name,iNumber,email,password) values('Nguyễn Văn B','123456789','duy@gmail.com','123456');
insert into Teacher(name,iNumber,email,password) values('Nguyễn Văn C','112345547','anansss1s23@gmail.com','123456');

select* from Student;

insert into student(name,dateOfBirth,username,password) values('sadasd','2021-02-16','duyyugi', '$2b$10$kOqQx7JnFwXODrjOtXlv4.gDE30PFlF2JpC1nu9bsNBVBfStRdF0G');

select* from Teacher;
select* from Lesson;
select* from Marker;
select* from Action;
select* from ARContent;
select* from TextARContent;