use igse;

-- USERS TBALES
create table users (
	id int primary key auto_increment,
	email Varchar(255) not null unique,
	address varchar(255) not null,
	numOfBedrooms int not null,
	voucherCode varchar(255),
	propertyType enum('DETACHED', 'SEMI_DETACHED', 'TERRACED', 'FLAT', 'COTTAGE', 'BUNGALOW', 'MANSION') not null,
	role enum('ADMIN', 'USER') not null,
	password varchar(255) not null
)
