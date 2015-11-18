DROP SCHEMA IF EXISTS mfd;

CREATE SCHEMA mfd ;

USE mfd;

CREATE TABLE Presets (
    presetId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    presetNumber INT UNSIGNED NOT NULL,
    presetName NVARCHAR(100) NOT NULL
);

CREATE TABLE RangeDimensions (
    rangeDimensionId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    minPresentationValue INT,
    maxPresentationValue INT,
    unit NVARCHAR(100)
);

CREATE TABLE ListDimensions (
    listDimensionId INT UNSIGNED PRIMARY KEY,
    listName NVARCHAR(100) NOT NULL
);

CREATE TABLE ListDimensionItems (
    listDimensionItemId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    listDimensionId INT UNSIGNED NOT NULL,
    FOREIGN KEY (listDimensionId)
        REFERENCES ListDimensions (listDimensionId),
    fromCcValue INT(14) UNSIGNED NOT NULL,
    throughCcValue INT(14) UNSIGNED NOT NULL,
    label NVARCHAR(100) NOT NULL
);

CREATE TABLE Controls (
    controlId INT UNSIGNED PRIMARY KEY,
    listDimensionId INT UNSIGNED,
    FOREIGN KEY (listDimensionId)
        REFERENCES ListDimensions (listDimensionId),
    rangeDimensionId INT UNSIGNED,
    FOREIGN KEY (rangeDimensionId)
        REFERENCES RangeDimensions (rangeDimensionId),
    ccNumberMsb INT(8) UNSIGNED,
    ccNumberLsb INT(8) UNSIGNED NOT NULL,
    controlName NVARCHAR(100) NOT NULL,
    minCcValue INT(14) UNSIGNED NOT NULL,
    maxCcValue INT(14) UNSIGNED NOT NULL
);

CREATE TABLE PresetControlValues (
    presetControlValueId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    presetId INT UNSIGNED,
    FOREIGN KEY (presetId)
        REFERENCES Presets (presetId),
    controlId INT UNSIGNED,
    FOREIGN KEY (controlId)
        REFERENCES Controls (controlId),
    ccValue INT(14) UNSIGNED
);
