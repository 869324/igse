use igse;


-- USERS TBALE
create table users (
	id int primary key auto_increment,
	email Varchar(255) not null unique,
	address varchar(255),
	numOfBedrooms int,
	propertyType enum('DETACHED', 'SEMI_DETACHED', 'TERRACED', 'FLAT', 'COTTAGE', 'BUNGALOW', 'MANSION'),
	role enum('ADMIN', 'USER') not null,
	password varchar(255) not null
);

insert into users (email, password, role) values ('gse@shangrila.gov.un', '$2a$15$aLjLVoC4X6jwsZI.gOWQmOqq7AoWOyiO.bRj8RZwj.HX8UwcgAv5S', 'ADMIN');


-- VOUCHERS TABLE
create table vouchers (
	id int primary key auto_increment,
	code Varchar(255) not null unique,
	userId int default 0,
	credit float not null,
	foreign key (userId) references users(id) on delete set null
);

insert into vouchers (code, credit)
values
	('XTX2GZAD' ,200),
	('NDA7SY2V' ,200),
	('RVA7DZ2D' ,200),
	('DM8LEESR' ,200);
