﻿var template="<td><textarea class=\"cell text\" style=\"width: 150px; height: 20px; text-align: left;\" rows=\"1\" readonly=\"\">${tm_jc}</textarea></td><td style=\"width:200px\"><table  border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr ><td style=\"height:36px;border-right:0px;\" ><textarea class=\"cell text\" style=\"width: 200px; height: 36px; text-align: left;\" rows=\"1\" readonly=\"\">${gisposition}</textarea></td></tr><tr ><td style=\"height:36px;border-right:0px;\" ><textarea class=\"cell text\" style=\"width: 200px; height: 36px; text-align: left;\" rows=\"1\" readonly=\"\">${banposition}</textarea></td></tr><tr ><td style=\"height:36px;border-right:0px;border-bottom:0px;\" ><textarea class=\"cell text\" style=\"width: 200px; height: 36px; text-align: left;\" rows=\"1\" readonly=\"\">${hinposition}</textarea></td></tr></tbody></table></td><td style=\"width:150px\"><table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr ><td style=\"height:36px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${tgisa}</textarea></td><td style=\"height:36px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${tgisb}</textarea></td><td style=\"height:36px;border-right:0px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${tgisc}</textarea></td></tr><tr ><td style=\"height:36px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${tbana}</textarea></td><td style=\"height:36px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${tbanb}</textarea></td><td style=\"height:36px;border-right:0px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${tbanc}</textarea></td></tr><tr ><td style=\"height:36px;border-bottom:0px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${thina}</textarea></td><td style=\"height:36px;border-bottom:0px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${thinb}</textarea></td><td style=\"height:36px;border-right:0px;border-bottom:0px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${thinc}</textarea></td></tr></tbody></table></td><td style=\"width:150px\"><table  border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr ><td style=\"height:36px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${sgisa}</textarea></td><td style=\"height:36px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${sgisb}</textarea></td><td style=\"height:36px;border-right:0px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${sgisc}</textarea></td></tr><tr ><td style=\"height:36px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${sbana}</textarea></td><td style=\"height:36px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${sbanb}</textarea></td><td style=\"height:36px;border-right:0px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${sbanc}</textarea></td></tr><tr ><td style=\"height:36px;border-bottom:0px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${shina}</textarea></td><td style=\"height:36px;border-bottom:0px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${shinb}</textarea></td><td style=\"height:36px;border-right:0px;border-bottom:0px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${shinc}</textarea></td></tr></tbody></table></td><td style=\"width:300px\"><table  border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr ><td style=\"border-right:0px;height:72px;\" colspan=\"4\"><textarea class=\"cell text\" style=\"width: 300px;height:71px; text-align: left;overflow:auto;\" rows=\"1\" readonly=\"\">${result}</textarea></td></tr><tr ><td style=\"border-bottom:0px;height:36px;\"><textarea class=\"cell text\" style=\"width: 69px;text-align: center;\" rows=\"1\" readonly=\"\">记录人</textarea></td><td style=\"border-bottom:0px;height:36px;\"><textarea class=\"cell text\" style=\"width: 79px;text-align: left;\" rows=\"1\" readonly=\"\">${per_enter_name}</textarea></td><td style=\"border-bottom:0px;height:36px;\"><textarea class=\"cell text\" style=\"width: 69px;text-align: left;\" rows=\"1\" readonly=\"\">值班负责人</textarea></td><td style=\"border-right:0px;border-bottom:0px;height:36px;\"><textarea class=\"cell text\" style=\"width: 79px;text-align: left;\" rows=\"1\" readonly=\"\">${per_zz_name}</textarea></td></tr></tbody></table></td>"


//"<td><textarea class=\"cell text\" style=\"width: 150px; height: 20px; text-align: left;\" rows=\"1\" readonly=\"\">${tm_jc}</textarea></td><td style=\"width:200px\"><table  border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr ><td style=\"height:36px;border-right:0px;\" ><textarea class=\"cell text\" style=\"width: 200px; height: 25px; text-align: left;\" rows=\"1\" readonly=\"\">${gisposition}</textarea></td></tr><tr ><td style=\"height:36px;border-right:0px;\" ><textarea class=\"cell text\" style=\"width: 200px; height: 25px; text-align: left;\" rows=\"1\" readonly=\"\">${banposition}</textarea></td></tr><tr ><td style=\"height:36px;border-right:0px;border-bottom:0px;\" ><textarea class=\"cell text\" style=\"width: 200px; height: 25px; text-align: left;\" rows=\"1\" readonly=\"\">${hinposition}</textarea></td></tr></tbody></table></td><td style=\"width:150px\"><table  border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr ><td style=\"height:36px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${tgisa}</textarea></td><td style=\"height:36px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${tgisb}</textarea></td><td style=\"height:36px;border-right:0px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${tgisc}</textarea></td></tr><tr ><td style=\"height:36px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${tbana}</textarea></td><td style=\"height:36px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${tbanb}</textarea></td><td style=\"height:36px;border-right:0px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${tbanc}</textarea></td></tr><tr ><td style=\"height:36px;border-bottom:0px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${thina}</textarea></td><td style=\"height:36px;border-bottom:0px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${thinb}</textarea></td><td style=\"height:36px;border-right:0px;border-bottom:0px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${thinc}</textarea></td></tr></tbody></table></td><td style=\"width:150px\"><table  border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr ><td style=\"height:36px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${sgisa}</textarea></td><td style=\"height:36px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${sgisb}</textarea></td><td style=\"height:36px;border-right:0px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${sgisc}</textarea></td></tr><tr ><td style=\"height:36px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${sbana}</textarea></td><td style=\"height:36px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${sbanb}</textarea></td><td style=\"height:36px;border-right:0px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${sbanc}</textarea></td></tr><tr ><td style=\"height:36px;border-bottom:0px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${shina}</textarea></td><td style=\"height:36px;border-bottom:0px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${shinb}</textarea></td><td style=\"height:36px;border-right:0px;border-bottom:0px;\" ><textarea class=\"cell text\" style=\"width: 49px; text-align: left;\" rows=\"1\" readonly=\"\">${shinc}</textarea></td></tr></tbody></table></td><td style=\"width:300px\"><table  border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr ><td style=\"border-right:0px;height:72px;\" colspan=\"4\"><textarea class=\"cell text\" style=\"width: 300px;height:71px; text-align: left;overflow:auto;\" rows=\"1\" readonly=\"\">${result}</textarea></td></tr><tr ><td style=\"border-bottom:0px;height:36px;\"><textarea class=\"cell text\" style=\"width: 69px;text-align: center;\" rows=\"1\" readonly=\"\">记录人</textarea></td><td style=\"border-bottom:0px;height:36px;\"><textarea class=\"cell text\" style=\"width: 79px;text-align: left;\" rows=\"1\" readonly=\"\">${per_enter_name}</textarea></td><td style=\"border-bottom:0px;height:36px;\"><textarea class=\"cell text\" style=\"width: 69px;text-align: left;\" rows=\"1\" readonly=\"\">值班负责人</textarea></td><td style=\"border-right:0px;border-bottom:0px;height:36px;\"><textarea class=\"cell text\" style=\"width: 79px;text-align: left;\" rows=\"1\" readonly=\"\">${per_zz_name}</textarea></td></tr></tbody></table></td>"
