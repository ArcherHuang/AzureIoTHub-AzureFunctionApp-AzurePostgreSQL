# AzureIoTHub-AzureFunctionApp-AzurePostgreSQL

## Create PG Database & Table
```
CREATE DATABASE iotdemo;
CREATE TABLE public.iotdata
(
    deviceid integer NOT NULL,
    createdate timestamp without time zone NOT NULL DEFAULT now(),
    data jsonb
);

SELECT COUNT(*) FROM public.iotdata;
SELECT * FROM public.iotdata;
DELETE FROM public.iotdata;
```

## Get Event From Azure IoT Hub
```
az iot hub monitor-events --y --resource-group iothub-function-pg --hub-name for-function-pg --device-id for-simulate
```