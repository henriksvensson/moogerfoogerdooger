USE mfd;

SET SQL_SAFE_UPDATES = 0;

DELETE FROM presetcontrolvalues;
DELETE FROM presets;
DELETE FROM controls;
DELETE FROM listdimensionitems;
DELETE FROM listdimensions;
DELETE FROM rangedimensions;

INSERT INTO `mfd`.`listdimensions`
(`listDimensionId`,
`listName`)
VALUES
(0, "Bypass on/off");

INSERT INTO `mfd`.`listdimensionitems`
(`listDimensionId`,
`fromCcValue`,
`throughCcValue`,
`label`)
VALUES
(0, 0, 63, "Bypassed"),
(0, 64, 127, "Active");

INSERT INTO `mfd`.`controls`
(`controlId`,
`listDimensionId`,
`rangeDimensionId`,
`ccNumberMsb`,
`ccNumberLsb`,
`controlName`,
`minCcValue`,
`maxCcValue`)
VALUES
(80, 0, NULL, NULL, 80, "Bypass on/off", 0, 127);

/*
SELECT 
    c.controlName,
    c.ccNumberMsb,
    c.ccNumberLsb,
    c.minCcValue,
    c.maxCcValue,
    ld.listname,
    ldi.label,
    ldi.fromCcValue,
    ldi.throughCcValue
FROM
    controls c
        LEFT JOIN
    listdimensionitems ldi ON c.listDimensionId = ldi.listDimensionId
        LEFT JOIN
    listdimensions ld ON ldi.listdimensionid = ld.listdimensionid;
*/

INSERT INTO `mfd`.`presets`
(`presetId`,
`presetNumber`,
`presetName`)
VALUES
(0, 0, "Bypass preset"),
(1, 1, "Active preset");


INSERT INTO `mfd`.`presetcontrolvalues`
(`presetId`,
`controlId`,
`ccValue`)
VALUES
(0, 80, 0),
(1, 80, 64);

/*
SELECT 
    *
FROM
    presets p
        JOIN
    presetcontrolvalues pcv ON pcv.presetId = p.presetid
*/