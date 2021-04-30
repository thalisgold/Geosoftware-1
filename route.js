/**
 * @author Thalis Goldschmidt
 * Matrikelnr.: 462238
 * This file contains the route. It is safed in an array [[number,number]].
 */

"use strict"

var route = [[7.595822811126709,51.9692307002609],[7.595672607421875,51.96886715591796],
            [7.5963377952575675,51.96878122682415],[7.5963377952575675,51.968411068844226],
            [7.596305608749389,51.967637693197894],[7.596777677536011,51.966771761038956],
            [7.597389221191406,51.96650074066608],[7.5978827476501465,51.966157005152745],
            [7.598086595535278,51.96568766971397],[7.59829044342041,51.96525799211564],
            [7.59851574897766,51.9650001835794],[7.59853720664978,51.96478203673666],
            [7.599073648452759,51.96479525778765],[7.599728107452393,51.96478203673666],
            [7.600286006927489,51.96484814195264],[7.600876092910767,51.964887805035445],
            [7.601423263549805,51.965026625548795],[7.602206468582153,51.96514561421807],
            [7.6031720638275155,51.96536375929126],[7.603965997695923,51.96554885124801],
            [7.6047492027282715,51.96575377359425],[7.605596780776977,51.96597852605797],
            [7.606809139251709,51.96642802760426],[7.608171701431274,51.966877524642335],
            [7.609233856201172,51.967254305451014],[7.610113620758056,51.967459219999604],
            [7.6111435890197745,51.96745260986749],[7.611985802650452,51.967254305451014],
            [7.612715363502502,51.96715184782538],[7.613310813903808,51.96716176308971],
            [7.61403501033783,51.96716837326473],[7.614678740501403,51.96719481395498],
            [7.614925503730773,51.96721133937848],[7.6152580976486215,51.96706591544261],
            [7.615644335746765,51.96691057571721],[7.615719437599182,51.96682133775913],
            [7.616057395935059,51.96669904841687],[7.616298794746399,51.96656684334713],
            [7.616502642631531,51.966504045802424],[7.616556286811829,51.96645777387105],
            [7.616373896598816,51.96609751220012],[7.616352438926696,51.9657207216663],
            [7.616288065910339,51.96531418095877],[7.615971565246582,51.965310875734644],
            [7.615858912467956,51.965353843629146],[7.61576235294342,51.96546291579171],
            [7.615606784820557,51.9654695262173],[7.615617513656615,51.965552156454585],
            [7.614941596984863,51.96555876686699],[7.614437341690064,51.9656116501311],
            [7.613954544067383,51.965621565736186],[7.6138365268707275,51.96540342191777],
            [7.613777518272401,51.96515222469043],[7.613734602928161,51.96494399434264],
            [7.613455653190613,51.96492416283051],[7.613165974617004,51.96485144721089],
            [7.612935304641724,51.96480186831168],[7.612946033477782,51.964415151015814],
            [7.612929940223694,51.96419700132566],[7.612758278846741,51.96420361193793],
            [7.612490057945251,51.96423005437727],[7.612318396568298,51.96420691724369],
            [7.612098455429077,51.96423997028799],[7.61201798915863,51.96433251868234],
            [7.611830234527588,51.96441845630598],[7.611728310585022,51.964487867343244],
            [7.611733675003052,51.96456719411138],[7.611857056617737,51.96467296291713],
            [7.611889243125916,51.96475889988803],[7.611443996429443,51.964765510417436],
            [7.6112186908721915,51.964765510417436],[7.611073851585388,51.964765510417436],
            [7.611057758331298,51.9648283103981],[7.610864639282227,51.96483822617646],
            [7.61076271533966,51.96497043634519],[7.610381841659546,51.96506959371581],
            [7.610177993774414,51.96511256184161],[7.610000967979431,51.96530426528567],
            [7.609689831733704,51.96543647407971],[7.6094645261764535,51.96554224083415],
            [7.609217762947083,51.96560173452382],[7.60903000831604,51.965595124117776],
            [7.608960270881652,51.96554224083415],[7.608906626701355,51.96548605227693],
            [7.608815431594849,51.96535053840795],[7.608611583709717,51.9651059513634],
            [7.608622312545776,51.9648283103981],[7.608965635299682,51.964841531435425],
            [7.609158754348754,51.964864668241404],[7.609255313873292,51.9648283103981],
            [7.60929822921753,51.964861362984145],[7.609314322471619,51.96479525778765],
            [7.6089924573898315,51.96466635237409],[7.60850429534912,51.96446803562927],
            [7.608107328414918,51.96430607630347],[7.607721090316772,51.964157337631555],
            [7.607635259628296,51.9641209792145],[7.607667446136475,51.964071399507276],
            [7.607570886611939,51.96402512506441],[7.607442140579223,51.964097842024614],
            [7.607238292694091,51.964018514425824],[7.606986165046691,51.96391604940293],
            [7.606868147850036,51.96379375213348],[7.606916427612305,51.96364831710845],
            [7.607012987136841,51.96357229406666],[7.607254385948181,51.96345330122063],
            [7.607350945472716,51.96338719394746],[7.6075440645217896,51.963492965537746],
            [7.607731819152831,51.96338388858125],[7.6079410314559945,51.96328142210756],
            [7.608101963996886,51.963202093063856],[7.608354091644288,51.96308971001161],
            [7.608606219291687,51.96296741048755],[7.60877251625061,51.96284511062979],
            [7.609035372734069,51.962742642924475],[7.609325051307677,51.96263356414209],
            [7.609797120094299,51.96262364787597],[7.610317468643188,51.96260381533719],
            [7.610794901847839,51.962574066512545],[7.6111650466918945,51.962600509913216],
            [7.611454725265503,51.96266331292724],[7.6116907596588135,51.962759169989575],
            [7.611808776855469,51.96289138629089],[7.611899971961975,51.96293435650484],
            [7.612216472625733,51.96282858359638],[7.612479329109192,51.962660007507644],
            [7.61277437210083,51.96253440138231],[7.6127421855926505,51.962326158872685],
            [7.612699270248412,51.96183695044107],[7.61202335357666,51.96187992166584],
            [7.611207962036133,51.96195925304949],[7.610414028167725,51.96182703399873],
            [7.609748840332032,51.96154937272266],[7.609040737152099,51.961271709726695],
            [7.60828971862793,51.96116593289488],[7.607688903808593,51.961284931813125],
            [7.606637477874756,51.961218821341994],[7.605628967285155,51.960822156467714],
            [7.60453462600708,51.96029326450866],[7.603349089622498,51.959989148806656],
            [7.603016495704651,51.95990320269087],[7.602710723876952,51.96001228811736],
            [7.602667808532714,51.96070976744851],[7.602694630622864,51.96095437848245],
            [7.602640986442567,51.96108329457135],[7.602646350860596,51.96130807045499],
            [7.602544426918029,51.961870005232996],[7.602480053901672,51.96226996628372],
            [7.602362036705017,51.96261703703068],[7.6022011041641235,51.963135985420216],
            [7.602061629295348,51.96350949232618],[7.601975798606872,51.963892912107276],
            [7.601895332336425,51.964104452651526],[7.601868510246277,51.964464730342776],
            [7.601847052574157,51.96478864726265],[7.601873874664307,51.9650299307939],
            [7.601873874664307,51.96520180320207],[7.601847052574157,51.96537698017065],
            [7.601943612098694,51.96550257833049],[7.601879239082336,51.965605039726505],
            [7.601932883262633,51.96590250696843],[7.601981163024903,51.96640819674872],
            [7.6020562648773184,51.96686760931512],[7.602099180221557,51.96708905110036],
            [7.602163553237915,51.967254305451014],[7.602324485778809,51.96760133760402],
            [7.602421045303344,51.96792523185573],[7.602614164352417,51.968206158647774],
            [7.602640986442567,51.96840445885252],[7.60280191898346,51.96855318343025],
            [7.602903842926025,51.96862589304416],[7.602844834327699,51.96875148209947],
            [7.602839469909667,51.96882419139164],[7.602968215942384,51.9689663046676],
            [7.6030486822128305,51.96902579381211],[7.603037953376769,51.96906545319789],
            [7.602732181549072,51.96908858782338],[7.602335214614867,51.969154686687595],
            [7.6021528244018555,51.96920095583451],[7.6016056537628165,51.969290189054426],
            [7.600838541984558,51.9694356057728],[7.600092887878418,51.96956449746962],
            [7.599545717239379,51.96967686428743],[7.599138021469115,51.969756181871546],
            [7.598708868026733,51.969848718875596],[7.5981831550598145,51.96989168241966],
            [7.597641348838806,51.96995778009931],[7.597405314445495,51.96999082890261],
            [7.597115635871886,51.970033792310424],[7.597045898437499,51.97010649952213],
            [7.596852779388428,51.97002718255804],[7.5967830419540405,51.96973635248869],
            [7.596965432167054,51.96963720544273],[7.597029805183411,51.96957441220016],
            [7.597019076347351,51.96946535004342]];
