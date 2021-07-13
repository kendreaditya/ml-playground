import React, { useEffect, useState } from "react";
import LineGraph from './visualizations/LineGraph';
import ContourScatter from './visualizations/ContourScatter';
import TSNE from './visualizations/TSNE';
import { createModel } from "../communication/api";
import { trainWebsocket } from "../communication/websocket";
import { colors } from "../consts";

const test_body = {
    "model_type": "logistic-regression",
    "x_train": [[3.651814577894287, 5.743264094022715], [-6.236950710878082, -6.320456613084277], [4.388482197008051, 3.5933389031517775], [-5.217681203227221, -3.90122314801281], [-4.484952313693952, -1.1472685093452788], [4.929834288541353, 3.3390390664840086], [4.050601111168057, 7.63238206483739], [-3.234545759718903, -4.595018289039045], [-5.783253292336237, -5.322061516205675], [5.368673308872901, 4.606661187672639], [-5.908024075521211, -6.412303701335292], [-4.04957616181395, -5.576903655662403], [6.446977884353733, 5.196554776511575], [-5.245388116002871, -5.753736164357489], [4.375181422304321, 5.026091050210834], [4.272862824175132, 4.752481364448495], [5.208382807947553, 2.9582651315757094], [-5.47917423784529, -5.1856589766638175], [4.8419921014210106, 4.57311893005258], [5.267050265869258, 5.889630795623437], [5.785800158650832, 5.425457561784965], [4.033023856870787, 4.9522886438580205], [5.289774856896413, 7.075400798645439], [4.4550809131910505, 5.399136114352071], [-5.680024721578491, -4.767746302838996], [5.132969674146876, 4.299879185060827], [3.9983799901050845, 4.718899707114045], [-5.248964148479073, -4.028429049045645], [-3.916948756824723, -3.9461979479650973], [2.349030191606988, 6.091506851922462], [4.75876394214367, 5.352055396514297], [4.657312405919651, 4.628559134004209], [7.526932425873621, 4.4691312270796795], [-6.448084341497324, -6.407463774376556], [-5.234153374723336, -5.234136956949181], [4.745022782579145, 6.503992988582689], [5.082283989275425, 6.065480375065351], [-4.77254006539587, -3.6928572457175717], [-3.8207028159361736, -4.932481518589891], [-5.990536325130688, -5.566297729602772], [4.373032942212233, 6.8124485579969285], [-4.526762375426455, -5.072828912656873], [5.128104414910789, 4.318948342525119], [-4.975489825741057, -4.50200170875455], [-5.072010121580334, -3.996467102107976], [-4.706927526701318, -5.714351418026368], [-4.503285846988767, -5.138264301171184], [-4.932471795312076, -6.424748186213456], [3.6555494889657227, 4.081348053515802], [-6.478521990367428, -5.719844208394709], [-4.740117205751576, -4.21817712822269], [-4.309856008288888, -5.4012204718858365], [-8.241267340069072, -6.02438764133429], [4.482711549899628, 6.40934744018558], [-4.6582440242228405, -3.1238291607841138], [-6.918771215299041, -5.026513875449217], [-4.100400124566749, -4.692700479123391], [-4.791136404995244, -6.959670123879776], [-4.879704368288101, -4.485561165941251], [-3.134225488855243, -4.5261670790882125], [4.779035826170336, 5.026885838994531], [4.236740843457483, 3.195117899335481], [2.3031133570584283, 4.945705133482188], [4.32360769794073, 6.800940432910815], [-6.191303497202648, -4.34344639136617], [-4.908239223464498, -6.987568914600892], [5.028744822934818, 6.278451862607299], [-5.702053093877352, -5.327662146597768], [-4.423443036944233, -4.688749845456464], [5.380197851005963, 5.6105857452838235], [3.4433708264760963, 5.60600995134564], [4.475479733720226, 5.489374561227918], [5.337602662075202, 4.588123033877532], [5.338496407494414, 4.584712086099199], [3.9878956247398323, 3.3451433281342307], [3.2212797510957216, 6.496044311489183], [4.139586634716047, 4.615444455770175], [-4.18648278263033, -6.230864316433955], [4.692221765046999, 5.219150327663939], [4.444800473306802, 6.88115706944059], [-4.452902618829962, -5.202192652433894], [-4.036623870755678, -4.587219073063502], [4.917848821607431, 6.117295831588128], [-5.471038305618323, -4.767950062642364], [4.740408648636395, 3.496857046881894], [-4.374332652234994, -5.857157556416283], [-4.480653485758828, -3.4672610869974223], [4.579813182904143, 4.718215391139493], [6.5931866266393975, 4.488784323568815], [4.512393775927507, 4.5674418121803795], [7.560084538268795, 4.90394010027535], [6.846636996047666, 3.9299152336738477], [5.170865438127942, 4.8160166636473205], [4.769065469791322, 5.696206364813419], [6.547505201330061, 6.7958776730955215], [5.593101257968383, 4.690453560686009], [-5.077101709414104, -4.658848025183356], [-4.749507149654123, -4.653551790503024], [4.482388700963829, 5.223787951638898], [-5.601706612229397, -3.147721815491062], [-5.875618253384757, -6.3827997309643365], [5.285865390724905, 5.3344567899870245], [-6.328186048898431, -4.8031387641308765], [4.754256935914055, 4.72727643025233], [4.287154217322835, 5.106430227691897], [-4.939769790058974, -2.536757887514714], [5.86960592010566, 6.3556378588049505], [-5.553649305347182, -6.197877892588848], [4.9672467297840015, 4.456575228866235], [-5.25256815139316, -6.2477831819648495], [-5.981508651047951, -4.53789652573673], [5.289168643907818, 7.455300139910895], [6.246085192497629, 2.9266097675918505], [-4.6759160306052046, -5.3850822804163165], [6.56552402923434, 4.934249738927012], [5.8711247034316925, 4.6739764678321585], [-3.4768759227303425, -4.461089956315341], [-3.3550322864987163, -5.249036039556378], [-2.8560559106746743, -4.366080977681989], [-5.808493602893187, -5.501757043584536], [-4.615934551060692, -5.032694748094093], [-4.14234037679798, -5.159938529963427], [4.664215300709872, 6.669021525289393], [-3.722335104211575, -5.59157138883583], [-5.699725507992586, -4.786020089265778], [-5.530257618372441, -5.792872832262344], [4.965315112613219, 5.234214732536521], [-6.067620429382594, -5.142379485021293], [-2.8778438029873668, -3.967534739448853], [5.198084760767855, 4.855639588076057], [-6.106334974006028, -6.196206624080671], [-4.935719980904537, -6.077744777929306], [3.7196956013291054, 5.872457328280145], [5.529804177915283, 6.4415686206579], [-4.886482654748752, -4.3378693254789535], [-5.192360964781122, -4.698452657666388], [-5.759132661553698, -4.849606213523792], [-4.656381710431539, -6.763040155362734], [-4.177455087896811, -6.220843649971022], [5.638592458777374, 3.33847993773104], [-6.062303713726105, -4.526407569364818], [-3.448848024477477, -4.8843253657071415], [5.569767280232204, 5.447708560017315], [-5.846793718068405, -6.514847224685864], [4.407606075761131, 4.136009230320184], [4.9339202013526835, 3.7889838002375433], [-5.460638770959788, -3.9428777737810843], [-6.304469500504853, -4.330327451169961], [4.337376241054153, 5.570598668593159], [4.362612872693482, 6.189016531107551], [-5.463417692812462, -5.4657297535702565], [-4.954428160096186, -5.651600347605817], [-4.9029224506519595, -4.031355009467111], [-5.013497224737934, -6.057710928955901], [6.1950466289248425, 3.476813095216225], [4.962365297575151, 6.103301882016521], [-3.4207871844926085, -4.2325652708470916], [-3.371384454428708, -6.380101458214892], [4.813128355838641, 4.560268941725825], [-4.208968052956953, -5.909387454794739], [-2.6853414333264913, -6.8672651925917485], [5.823170583961915, 5.073317967188403], [4.167644426895771, 5.471415556386404], [-4.668736568596436, -4.024454872877641], [4.966873027126203, 6.794557863517788], [5.650201177958661, 4.900824136220617], [-5.676922000305959, -4.388323711159132], [-6.724917832513032, -5.562287529240972], [3.640143859020081, 5.746253566027221], [-5.772825214537572, -5.236818606740009], [-7.619745104089745, -4.178097495624776], [-3.694521192845671, -4.978996158367241], [3.4160971765142767, 5.760414656144297], [-7.025142586657607, -4.813545685230572], [-5.715303709259969, -4.320402251065325], [-4.689092434401996, -3.524643783050448], [5.1867667644770785, 4.2446170676466775], [-5.108760148456858, -4.598288277901059], [-4.7190081322649675, -5.622699519820594], [6.665474444462577, 6.014370065018131], [5.177701000933254, 3.6646556412898987], [-5.898414671348358, -4.508080828493494], [6.255756125573521, 4.105392697780496], [5.0865897874729, 4.84432276460792], [5.645484181141075, 7.16325472330546], [-3.413983183854648, -6.2378154988268495], [5.195845255097682, 4.021627222384968], [-5.919424234233803, -3.4500655949824606], [-2.939252075118013, -3.2446591575567956], [-5.8254971967925115, -5.321385841652994], [6.503398301767151, 5.877362290575672], [4.076766753889096, 3.6483153943836664], [5.938283805975997, 4.4839552717826265], [2.5283554998727107, 4.203104744529523], [-5.485363547829103, -4.918125860613677], [-6.037246154326456, -5.1903386780836085], [-5.208122250357275, -5.493000934658832], [-5.223462785325851, -4.285999505907908], [-5.020901593964148, -4.882672616691218], [6.029155637325644, 5.472597482413043], [5.440014450053332, 4.497945775647389], [-4.17793984000551, -3.103207017346053], [-5.007972641316617, -3.520055861109974], [-5.012246772846915, -5.897254371485832], [-3.8418891264999324, -4.208337306037064], [-5.114539845252618, -3.7621836880265382], [-5.107030359954558, -6.035242322419374], [-4.478058434383103, -4.703015326766814], [5.342725346377704, 5.456753219153784], [5.114227648662039, 5.150301761461877], [5.926177547531641, 6.9094166404701305], [-5.661786464768388, -4.147566665203776], [4.209525544554688, 5.471468357135996], [4.555706739923888, 5.377300493044852], [5.2704568257798385, 4.949761890550863], [2.918070592116278, 6.696456368290038], [5.0283183761304615, 5.0297561394957455], [-5.062679097273172, -4.044857679498762], [3.719570647503717, 6.754794181984365], [-5.5305011476105275, -5.57581824064468], [6.149273326285676, 4.296823574874113], [5.371145873371309, 4.39601481328418], [-5.035826039109952, -3.435356344185994], [-6.320233207020642, -3.1685412341456463], [-4.930197915009981, -5.38531359686176], [4.460240319690638, 4.221695274597687], [-3.3128583649274352, -4.1183602430505495], [4.983577103927248, 6.188393273448084], [5.326927373764162, 4.780899471191136], [-3.8571771854849795, -4.248066967313226], [-4.313739809625487, -6.612715871189652], [-5.264656833237956, -2.279830833410381], [3.620680771985473, 4.269069960058081], [-4.758037728433965, -6.913280244657798], [5.307801768892059, 3.289831607343374], [3.9189366724001027, 5.615935606944264], [3.8894241545341712, 6.7522704434236225], [-4.3180470287050365, -5.310266756593456], [-5.828995010922072, -5.560181040196969], [-5.0190162079026885, -6.002529364637809], [5.833922154548904, 5.459180079228437], [-4.902323901451168, -5.77300855467], [6.206508966508357, 4.183064329012764], [-3.534351231078446, -5.225776300486536], [4.424362173762226, 5.122009814645361], [-4.48496473279134, -4.486214049087791], [-3.841404420992596, -5.820682318351711], [-4.912952931761829, -5.2990073504658675], [5.055724912288695, 6.094191518470948], [-4.024880266582249, -5.1470573815021385], [5.243800713771199, 4.435921369263272], [5.478979825746392, 5.333662105286948], [4.9544139836445025, 5.243339449322692], [-6.713134529090878, -3.646127625834587], [6.037539944257899, 4.489983601145253], [3.9958592332479324, 4.232202434895871], [-5.589364756944212, -4.150397902978975], [5.559790447931039, 6.080780725554622], [-4.642984514034953, -5.692909595260654], [6.382158991037527, 5.648709887589643], [5.829405581183489, 2.788864690992115], [-5.4749453111609565, -5.653329232573712], [5.256029734313875, 5.982690983945514], [-4.785906255869796, -6.2457387787119885], [-5.151785095035583, -4.411682793515423], [-1.9211191915447623, -3.8804250885654232], [5.681891489626311, 6.846707325736034], [-4.826819074148818, -4.6146826202711635], [6.031844539468635, 3.514439626963028], [-6.2002964070557764, -5.334501235840948], [-4.775907518189583, -4.987407599218205], [-5.450065471479244, -4.377150067652501], [-4.922631692352382, -5.861284201328264], [5.654365656354058, 4.944415329089545], [4.730125064706629, 4.021236284217693], [4.29565630945724, 3.5915387036364406], [5.632407739055521, 5.97255444962673], [5.4296182191325855, 5.207687687163111], [3.1292080789741443, 4.648486515958691], [-6.260883954335045, -4.082138052945224], [5.413434903223701, 6.876795812558066], [-4.633401753903152, -5.939879786327356], [6.550500492814077, 4.001645959261209], [-6.703382439355154, -5.055547698896619], [-4.556180571853772, -4.225365946570664], [4.950536290347567, 5.674819492166604], [3.5214137542201582, 6.143754043206929], [5.590654830692309, 6.108703580582908], [4.024126747022668, 6.05364179660784], [5.632781866106285, 7.270692857804396], [5.211017467202619, 4.903286888129608], [5.830335816544245, 4.1439161740911326], [5.271578837195373, 3.723251424179691], [5.7216720640432355, 3.870948228782771], [-5.471931865789434, -3.911049403032634], [-4.67728143966191, -5.827230943552323], [7.445751979616826, 5.129221181975227], [4.387211309515614, 4.6122984400640155], [4.55381656678522, 3.110459269054469], [5.19652116970147, 5.709003757588512], [5.166452208213056, 5.4924512640081495], [-4.385833299956575, -4.242492289952695], [6.882024496475034, 6.3454200461549775], [-4.375880182947845, -4.37165449073572], [-3.8368362478450404, -4.989766938980413], [-3.820559879278713, -5.469175652104704], [5.500917187624381, 4.022444755201449], [-5.11232804969083, -5.220969599533223], [-5.7303666317171364, -4.783541410418025], [-5.7925207384327, -5.114736441466899], [5.924027019206901, 4.8150978635570105], [-5.513866917336694, -6.059213521888951], [4.565503772567684, 4.690827876531361], [3.9189434595917376, 6.053152853332904], [-6.519369965954013, -5.4842340728662515], [5.018418379189551, 6.676437312275283], [7.29889812361925, 4.637161439560341], [-5.315269244640346, -4.241030779506732], [3.1591257686683547, 3.7204230332642982], [6.848956094945345, 6.126565029547757], [-3.3675886960683648, -6.4301413779606325], [5.191099068019903, 5.046436548156149], [-5.529760203767038, -4.486732566886644], [6.073631749859772, 3.9734847005889398], [-6.550663431066132, -4.931437025193973], [2.961875464822146, 3.9919136890825957], [-5.889514429625523, -5.815810284965439], [-5.756350745284303, -6.422253709597674], [-3.548856392204958, -4.0407291739147935], [4.9650115095030385, 6.77080063563551], [-4.675833647511558, -5.130143054367685], [-5.544382724525183, -4.889077410290134], [-4.638604394491586, -3.461963433534031], [-5.839217523222638, -5.309212375851215], [-5.822220395566432, -4.756312788508088], [-2.8669666253437334, -6.952087799522502], [4.960444846143345, 5.681500697372624], [3.7778721911080546, 5.712998430172388], [-7.067442100039877, -5.089120039512788], [-5.446514952067021, -4.143601205676528], [-5.34271451652677, -5.802277269221619], [-5.127917591480767, -5.9555404406004255], [4.9598420493556565, 3.569224897881952], [5.493317900880889, 5.184836123694874], [-5.01851313599239, -5.288658638920138], [-3.5221059552584837, -5.518270218273647], [6.797686526849523, 5.64084286126701], [3.8772779784377014, 5.3824097461840505], [-6.534114170735622, -3.722323178101491], [6.201213922163944, 4.591924626978448], [5.048521627944827, 4.169049883588962], [4.554497478599228, 6.453384477117701], [-5.469474385934952, -4.457439956414035], [4.76105195313359, 4.092436337958402], [4.832881919683146, 5.146713686433323], [-4.642212639651717, -4.439215473631766], [-5.985726046335544, -4.495953484482156], [4.4477769557190285, 5.6329318177555106], [-5.9649234605801045, -4.313948540001561], [-4.755033428891277, -5.50694317537113], [-5.883857436201133, -4.846274894054472], [5.1818662550584955, 5.248220586300336], [-6.183258512665775, -7.0392321777601], [-3.597205689063901, -6.4018510627922804], [-5.392108153132158, -6.463514948132119], [-4.187474177605802, -3.6437599714291773], [4.3481638921978405, 5.047398671316414], [7.57335980324986, 5.059218434014488], [-6.594427658794367, -5.599375022953772], [6.066674689589154, 6.169295590445673], [-3.969000477504049, -4.068719880883801], [4.362260015748684, 4.469003044998182], [-3.0352748670836105, -4.964736448028272], [3.3305947188786282, 5.543360192379935], [5.235614558108566, 5.770865193886967], [-6.006017381499702, -6.214188612787732], [4.3768594735752355, 4.444522880839745], [-4.80094030442653, -5.600216877158795], [-4.41314290619973, -2.8095443741900215], [-3.5587267109338843, -6.435862151179439], [-3.7330888508133775, -5.707669465618781], [3.748460575809556, 6.44376460407326], [-6.012831120334424, -4.685752667404726], [4.731111309445169, 3.8934740912583297], [4.441078152728411, 5.377211875064521], [-4.900348634912358, -5.503475654116199], [5.756988616645351, 4.077834675822374], [-5.600638689918805, -5.291693749793277], [-4.17458365101197, -4.186490363999361], [-5.219671887837512, -4.642887428488254], [4.141642219818786, 5.700309879408992], [3.9787671828692868, 5.708356447299353], [5.222133771633713, 4.5212513783365225], [-5.269406834444558, -4.282457744204038], [5.394452142378297, 4.5790155191797375], [5.65854427267283, 7.01020453876635], [5.2029230208512995, 3.484255885002768], [3.5924883052821786, 4.222183312409125], [-6.515191062198552, -3.6331257325554756], [-4.667685988020408, -5.748486536556554], [-4.354624050414852, -3.631368442467651], [5.071566237219392, 4.522342553234884], [4.904704467613048, 5.2790215257703395], [3.6014324261808586, 5.562969236690571], [4.547693680750923, 2.5761206733710433], [5.840643548988724, 4.3473760206976095], [4.2262108008964265, 3.755345296688583], [4.47727697948096, 6.0490092258368895], [6.0062928092144405, 4.423108130476852], [-4.994756300281817, -4.953019406235258], [-5.818220683233473, -2.9076127243145398], [-4.084597882297926, -4.6712488903403155], [-3.497642947903972, -4.925905219580224], [5.0961207769409835, 4.537724711294958], [-5.839721842180776, -5.599392645444022], [5.481009231736714, 5.223884024279132], [5.099332305429225, 5.751387123371789], [-4.429109489306833, -3.864434359819401], [-3.1138140987894696, -4.825422187168161], [4.925566570899954, 5.620672097550678], [-4.3523114618993075, -3.4769701435919744], [4.510560557481778, 6.044160877069072], [4.910264305712773, 6.440117215449472], [-4.994886543357539, -5.234587133375147], [5.984322398476584, 4.786011155774491], [-5.974681670227321, -4.212915396257548], [-4.28838512191111, -6.1246420918378695], [-4.638363974952366, -5.645119754605124], [3.3724575621168373, 5.048084946661382], [6.420504247989855, 4.429253706250524], [5.4082527557144715, 3.2974163957621596], [-6.070892498061112, -4.517527584756815], [5.9356783931474615, 6.2715550949941585], [3.474474829075261, 4.3080919301187555], [-5.161285711666009, -4.595949143185462], [4.63903383418092, 6.159329803364248], [5.259722501721482, 4.095683374895591], [-6.6064463202575725, -4.796536364132777], [-6.150993577422303, -4.6243019816543285], [3.307535370285181, 6.529550319460614], [-4.986998108122093, -3.546465922842683], [5.621809962217196, 3.429775280109544], [5.57707212718054, 4.796954613957007], [-4.924195441806273, -5.677161711512111], [5.013929291912946, 4.975874912889997], [4.9963974609094315, 3.8416353108074572], [-5.4400444866969835, -4.869259422713909], [5.27996862631982, 3.8745109527016233], [5.642722759867544, 6.329152530132431], [3.710039100258946, 3.704921227936384]],
    "y_train": [1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
    "x_test": [[-5.646572884242526, -6.081548003614395], [-4.7424496092772355, -5.074445915766168], [5.018433933065393, 5.347581705361671], [-6.415370742050414, -5.420645322765359], [5.2493836837107555, 6.577453279763475], [-5.718444221252436, -5.213447151711847], [5.820482181197364, 5.507274031107298], [-2.8101970667823277, -5.808298285355152], [4.752822617479403, 4.318015752002202], [-2.8468175424884437, -5.76734756288805], [-4.587068545724375, -5.563724552803975], [-5.034711769705243, -6.168678037619532], [-4.703879722935424, -4.738944727820111], [5.7109599682034915, 5.44426331148604], [-5.275051697151644, -7.301921164735585], [4.3493574308781735, 4.512874616235304], [-5.11564828238824, -5.301103695589289], [4.010395179741419, 4.874213079900352], [4.5535663854494715, 5.1940899928983075], [-4.903004035007282, -4.404842974563087], [6.167782061659807, 5.254420843301213], [5.583928185325964, 4.64070790921294], [-7.123895724309807, -5.525755021680761], [5.707751935455476, 4.437533224105732], [4.540639100459756, 4.150155630535208], [6.579572145730713, 4.477139972846731], [4.759674601841865, 4.625179192450402], [4.423228669431667, 5.755391225825756], [5.109394794604893, 5.725766623898692], [-4.18713788116104, -4.370371158076388], [-5.926930471578083, -5.0595253560618], [-4.252706394876738, -4.389629734566535], [4.636387787786144, 4.9430543762789325], [-4.941791281554, -6.142970297830623], [5.517659020469123, 4.274256186846534], [-4.723309200669981, -4.172816750963976], [5.607896509716539, 5.186609123156358], [4.4263379931197635, 4.453141058759607], [-3.941575513150412, -6.7587394864231145], [3.5519860995837558, 2.801194043379918], [-4.495012721019543, -4.134244805829878], [4.428821010217203, 5.572582781356159], [-4.261533420004589, -4.82863171881003], [-4.127679363279322, -4.816657994261648], [-6.6074832345612275, -4.815366141467695], [-4.045998236506797, -4.348608748694202], [5.835692112065142, 3.870293145342382], [5.326133022242118, 3.748886423614697], [4.82305277250595, 4.201702755461547], [-6.3776693679570915, -5.937825039915123]],
    "y_test": [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0],
    "params": {"epoch": 10}

}

const ResultsPannel= () => {
    const [loss, setLoss] = useState([])
    const [accuracy, setAccuracy] = useState([])
    const [TSNE_points, setTSNE_points] = useState({x: [[0,0]], y:[0]})
    // const [TSNE_points, setTSNE_points] = useState({x: [], y:[]})
    const [meshgrid, setMeshgrid] = useState([])

    const trainModel = async () => {
        var model_id = await createModel(test_body)

        const ws = trainWebsocket(model_id)

        ws.onopen = () => {
            console.log('connected')
        }

        ws.onmessage = evt => {
            const data = JSON.parse(evt.data)
            setLoss(loss => {
                return [...loss, data.loss]
            })

            setAccuracy(accuracy => {
                return [...accuracy, data.accuracy]
            })

            setTSNE_points({x: data.tsne, y: test_body.y_train})

            setMeshgrid(data.heatmap)
        }
    }
    

    return (<>
            <button onClick={trainModel}>Train Me!</button>
            <LineGraph x={loss} color={colors[0]}/>
            <LineGraph x={accuracy} color={colors[0]} domain={[0, 1]}/>
            <ContourScatter points={{x: test_body.x_train, y:test_body.y_train}} meshgrid={meshgrid}/>
            <TSNE points={TSNE_points}/>
        </>
    )
}

export default ResultsPannel;
