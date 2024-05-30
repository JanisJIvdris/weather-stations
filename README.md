# Komentārs:
Atbilstoši uzdevuma nostādnei tika izveidots kods web servisam izmantojot Express.js, lai tas iegūtu datus  no norādītā datu avota.<br />
Neliels koda darbības pārskats:<br />

> Vides mainīgie(envionment variables) - Serviss paredz API atslēgas un porta nummura norādīšanu .env failā. Tie vēlāk tiek iegūti izmantojot 'dotenv' moduli.<br />
> Autentifikācija - Lai ierobežotu piekļuvi API tika izveidota HTTP uzrādītāja(bearer) atslēgas autentifikācija, kas tika izveidota izmantojot starpprogrammatūru(middleware). Autentifikācija notiek izmantojot uzrādītāja tokenu. Lai autentificētu pieprasījumu ir jāiekļauj derīga API atslēga, kas attiecīgi ļauj piekļūt endpointiem.<br />
> REST API endpointi - Endponti atgriež uzdevuma nostādnē norādīto informāciju:<br />
  "/stations" - atgriež visu staciju ID un nosaukumus JSON formātā.<br />
  "/stations/:id" - atgriež datus, par staciju ar konkrēto ID JSON formātā.<br />
> Kļūdu apstrāde - Pakalpojums apstrādā kļūdas un ,kļūdas gadījumā, atgriež atbilstošo errora kodu.<br />
> Testi - Lai nodrošinātu pienācīgu darbību, izmantojot Jest un Supertest, tika izveidoti testi kas:<br />
-Imitē API atbildes.<br />
-Pārbauda autentifikācijas darbību.<br />
-Pārbauda vai abi endpointi atgriež vajadzīgo informāciju.<br />
-Pārbauda gadijumu, ja stacija netiek atrasta.<br />
-Apstrādā autorizājas kļūdas.<br />

>Testēšanai tika izmantots Postman un https://editor.swagger.io/ priekš OpenAPI specificācijas<br />

P.s. Ļoti atvainojos, par neveiksmīgo terminoloģijas tulkojumu uz latviešu valodu.<br />
========================================================



# weather-stations
https://github.com/saleniex/homework3?tab=readme-ov-file

Homework
Create web service with REST API which provide info about wether stations in Latvia.

Requirements:

1.API should expose two endpoints:

2.List of all stations with two properties: Station_id and Name,<br />
Station details by Station_id with all data fields found in data source;<br />
In order to limit access to API implement simple HTTP bearer preshared key authentication;<br />

3.Write Unittests if neecessary;<br />

4.Write OpenAPI specification for service;<br />

5.Create Dockerfile so webservice can be used by runing docker run;<br />

6.Assume data in data source is subject of change;

7.Use data from open data source: https://data.gov.lv/dati/lv/dataset/hidrometeorologiskie-noverojumi/resource/c32c7afd-0d05-44fd-8b24-1de85b4bf11d;<br />

8.Commit each step;<br />

9.Provide result as GitHub repository.<br />
