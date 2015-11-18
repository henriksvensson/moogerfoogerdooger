USE mfd;

SET SQL_SAFE_UPDATES = 0;

DELETE FROM PresetControlValues;
DELETE FROM Presets;
DELETE FROM Controls;
DELETE FROM ListDimensionItems;
DELETE FROM ListDimensions;
DELETE FROM RangeDimensions;

INSERT INTO mfd.ListDimensions
(listDimensionId,
listName)
VALUES
(0, "Bypass on/off");

INSERT INTO mfd.ListDimensionItems
(listDimensionId,
fromCcValue,
throughCcValue,
label)
VALUES
(0, 0, 63, "Bypassed"),
(0, 64, 127, "Active");

INSERT INTO mfd.Controls
(controlId,
listDimensionId,
rangeDimensionId,
ccNumberMsb,
ccNumberLsb,
controlName,
minCcValue,
maxCcValue)
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

INSERT INTO mfd.Presets
(presetId,
presetNumber,
presetName)
VALUES
(0, 0, "Bypass preset"),
(1, 1, "Active preset");


INSERT INTO mfd.PresetControlValues
(presetId,
controlId,
ccValue)
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