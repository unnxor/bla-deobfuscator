(function (global, callback) {
  typeof exports === "object" && typeof module !== "undefined" ? callback(exports) : typeof define === "function" && define.amd ? define(["exports"], callback) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, callback(global.acorn = {}));
})(this, function (exports) {
  'use strict';

  var list = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 81, 2, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 9, 5351, 0, 7, 14, 13835, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 983, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
  var list2 = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 4026, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 757, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 4191];
  var text = "\u200c\u200d\xb7\u0300-\u036f\u0387\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u07fd\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u0898-\u089f\u08ca-\u08e1\u08e3-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u09fe\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0afa-\u0aff\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b55-\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c00-\u0c04\u0c3c\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c81-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0cf3\u0d00-\u0d03\u0d3b\u0d3c\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d81-\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0ebc\u0ec8-\u0ece\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u180f-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19d0-\u19da\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1ab0-\u1abd\u1abf-\u1ace\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf4\u1cf7-\u1cf9\u1dc0-\u1dff\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\u30fb\ua620-\ua629\ua66f\ua674-\ua67d\ua69e\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua82c\ua880\ua881\ua8b4-\ua8c5\ua8d0-\ua8d9\ua8e0-\ua8f1\ua8ff-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\ua9e5\ua9f0-\ua9f9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b-\uaa7d\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f\uff65";
  var text2 = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u052f\u0531-\u0556\u0559\u0560-\u0588\u05d0-\u05ea\u05ef-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u0860-\u086a\u0870-\u0887\u0889-\u088e\u08a0-\u08c9\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u09fc\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0af9\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d\u0c58-\u0c5a\u0c5d\u0c60\u0c61\u0c80\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cdd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d04-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d54-\u0d56\u0d5f-\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e86-\u0e8a\u0e8c-\u0ea3\u0ea5\u0ea7-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f5\u13f8-\u13fd\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f8\u1700-\u1711\u171f-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1878\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191e\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4c\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1c80-\u1c88\u1c90-\u1cba\u1cbd-\u1cbf\u1ce9-\u1cec\u1cee-\u1cf3\u1cf5\u1cf6\u1cfa\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2118-\u211d\u2124\u2126\u2128\u212a-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312f\u3131-\u318e\u31a0-\u31bf\u31f0-\u31ff\u3400-\u4dbf\u4e00-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua69d\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua7ca\ua7d0\ua7d1\ua7d3\ua7d5-\ua7d9\ua7f2-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua8fd\ua8fe\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\ua9e0-\ua9e4\ua9e6-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa7e-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab69\uab70-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
  var obj = {
    3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
    5: "class enum extends super const export import",
    6: "enum",
    strict: "implements interface let package private protected public static yield",
    strictBind: "eval arguments"
  };
  var text3 = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";
  var obj2 = {
    5: text3,
    "5module": text3 + " export import",
    6: text3 + " const class extends export import super"
  };
  var pattern = /^in(stanceof)?$/;
  var regExp = new RegExp("[" + text2 + "]");
  var regExp2 = new RegExp("[" + text2 + text + "]");
  function fn(num23, list4) {
    var num24 = 65536;
    for (var i3 = 0; i3 < list4.length; i3 += 2) {
      num24 += list4[i3];
      if (num24 > num23) {
        return false;
      }
      num24 += list4[i3 + 1];
      if (num24 >= num23) {
        return true;
      }
    }
    return false;
  }
  function isIdentifierStart(num23, arg) {
    if (num23 < 65) {
      return num23 === 36;
    }
    if (num23 < 91) {
      return true;
    }
    if (num23 < 97) {
      return num23 === 95;
    }
    if (num23 < 123) {
      return true;
    }
    if (num23 <= 65535) {
      return num23 >= 170 && regExp.test(String.fromCharCode(num23));
    }
    if (arg === false) {
      return false;
    }
    return fn(num23, list2);
  }
  function isIdentifierChar(num23, arg) {
    if (num23 < 48) {
      return num23 === 36;
    }
    if (num23 < 58) {
      return true;
    }
    if (num23 < 65) {
      return false;
    }
    if (num23 < 91) {
      return true;
    }
    if (num23 < 97) {
      return num23 === 95;
    }
    if (num23 < 123) {
      return true;
    }
    if (num23 <= 65535) {
      return num23 >= 170 && regExp2.test(String.fromCharCode(num23));
    }
    if (arg === false) {
      return false;
    }
    return fn(num23, list2) || fn(num23, list);
  }
  var TokenType = function fn40(label, options) {
    if (options === void 0) options = {};
    this.label = label;
    this.keyword = options.keyword;
    this.beforeExpr = !!options.beforeExpr;
    this.startsExpr = !!options.startsExpr;
    this.isLoop = !!options.isLoop;
    this.isAssign = !!options.isAssign;
    this.prefix = !!options.prefix;
    this.postfix = !!options.postfix;
    this.binop = options.binop || null;
    this.updateContext = null;
  };
  function fn2(arg, binop) {
    return new TokenType(arg, {
      beforeExpr: true,
      binop
    });
  }
  var obj3 = {
      beforeExpr: true
    },
    obj4 = {
      startsExpr: true
    };
  var keywordTypes = {};
  function fn3(keyword, obj13) {
    if (obj13 === void 0) obj13 = {};
    obj13.keyword = keyword;
    return keywordTypes[keyword] = new TokenType(keyword, obj13);
  }
  var types$1 = {
    num: new TokenType("num", obj4),
    regexp: new TokenType("regexp", obj4),
    string: new TokenType("string", obj4),
    name: new TokenType("name", obj4),
    privateId: new TokenType("privateId", obj4),
    eof: new TokenType("eof"),
    bracketL: new TokenType("[", {
      beforeExpr: true,
      startsExpr: true
    }),
    bracketR: new TokenType("]"),
    braceL: new TokenType("{", {
      beforeExpr: true,
      startsExpr: true
    }),
    braceR: new TokenType("}"),
    parenL: new TokenType("(", {
      beforeExpr: true,
      startsExpr: true
    }),
    parenR: new TokenType(")"),
    comma: new TokenType(",", obj3),
    semi: new TokenType(";", obj3),
    colon: new TokenType(":", obj3),
    dot: new TokenType("."),
    question: new TokenType("?", obj3),
    questionDot: new TokenType("?."),
    arrow: new TokenType("=>", obj3),
    template: new TokenType("template"),
    invalidTemplate: new TokenType("invalidTemplate"),
    ellipsis: new TokenType("...", obj3),
    backQuote: new TokenType("`", obj4),
    dollarBraceL: new TokenType("${", {
      beforeExpr: true,
      startsExpr: true
    }),
    eq: new TokenType("=", {
      beforeExpr: true,
      isAssign: true
    }),
    assign: new TokenType("_=", {
      beforeExpr: true,
      isAssign: true
    }),
    incDec: new TokenType("++/--", {
      prefix: true,
      postfix: true,
      startsExpr: true
    }),
    prefix: new TokenType("!/~", {
      beforeExpr: true,
      prefix: true,
      startsExpr: true
    }),
    logicalOR: fn2("||", 1),
    logicalAND: fn2("&&", 2),
    bitwiseOR: fn2("|", 3),
    bitwiseXOR: fn2("^", 4),
    bitwiseAND: fn2("&", 5),
    equality: fn2("==/!=/===/!==", 6),
    relational: fn2("</>/<=/>=", 7),
    bitShift: fn2("<</>>/>>>", 8),
    plusMin: new TokenType("+/-", {
      beforeExpr: true,
      binop: 9,
      prefix: true,
      startsExpr: true
    }),
    modulo: fn2("%", 10),
    star: fn2("*", 10),
    slash: fn2("/", 10),
    starstar: new TokenType("**", {
      beforeExpr: true
    }),
    coalesce: fn2("??", 1),
    _break: fn3("break"),
    _case: fn3("case", obj3),
    _catch: fn3("catch"),
    _continue: fn3("continue"),
    _debugger: fn3("debugger"),
    _default: fn3("default", obj3),
    _do: fn3("do", {
      isLoop: true,
      beforeExpr: true
    }),
    _else: fn3("else", obj3),
    _finally: fn3("finally"),
    _for: fn3("for", {
      isLoop: true
    }),
    _function: fn3("function", obj4),
    _if: fn3("if"),
    _return: fn3("return", obj3),
    _switch: fn3("switch"),
    _throw: fn3("throw", obj3),
    _try: fn3("try"),
    _var: fn3("var"),
    _const: fn3("const"),
    _while: fn3("while", {
      isLoop: true
    }),
    _with: fn3("with"),
    _new: fn3("new", {
      beforeExpr: true,
      startsExpr: true
    }),
    _this: fn3("this", obj4),
    _super: fn3("super", obj4),
    _class: fn3("class", obj4),
    _extends: fn3("extends", obj3),
    _export: fn3("export"),
    _import: fn3("import", obj4),
    _null: fn3("null", obj4),
    _true: fn3("true", obj4),
    _false: fn3("false", obj4),
    _in: fn3("in", {
      beforeExpr: true,
      binop: 7
    }),
    _instanceof: fn3("instanceof", {
      beforeExpr: true,
      binop: 7
    }),
    _typeof: fn3("typeof", {
      beforeExpr: true,
      prefix: true,
      startsExpr: true
    }),
    _void: fn3("void", {
      beforeExpr: true,
      prefix: true,
      startsExpr: true
    }),
    _delete: fn3("delete", {
      beforeExpr: true,
      prefix: true,
      startsExpr: true
    })
  };
  var lineBreak = /\r\n?|\n|\u2028|\u2029/;
  var lineBreakG = new RegExp(lineBreak.source, "g");
  function isNewLine(arg) {
    return arg === 10 || arg === 13 || arg === 8232 || arg === 8233;
  }
  function fn4(text15, arg, num23) {
    if (num23 === void 0) num23 = text15.length;
    for (var i3 = arg; i3 < num23; i3++) {
      var charCodeAt = text15.charCodeAt(i3);
      if (isNewLine(charCodeAt)) {
        return i3 < num23 - 1 && charCodeAt === 13 && text15.charCodeAt(i3 + 1) === 10 ? i3 + 2 : i3 + 1;
      }
    }
    return -1;
  }
  var nonASCIIwhitespace = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
  var pattern2 = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;
  var prototype = Object.prototype;
  var hasOwnProperty = prototype.hasOwnProperty;
  var toString = prototype.toString;
  var fn5 = Object.hasOwn || function (arg, arg2) {
    return hasOwnProperty.call(arg, arg2);
  };
  var fn6 = Array.isArray || function (arg) {
    return toString.call(arg) === "[object Array]";
  };
  var create = Object.create(null);
  function fn7(text15) {
    return create[text15] || (create[text15] = new RegExp("^(?:" + text15.replace(/ /g, "|") + ")$"));
  }
  function fn8(num23) {
    if (num23 <= 65535) {
      return String.fromCharCode(num23);
    }
    num23 -= 65536;
    return String.fromCharCode((num23 >> 10) + 55296, (num23 & 1023) + 56320);
  }
  var pattern3 = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/;
  var Position = function fn40(line, column) {
    this.line = line;
    this.column = column;
  };
  Position.prototype.offset = function fn40(arg) {
    return new Position(this.line, this.column + arg);
  };
  var SourceLocation = function fn40(obj13, start, end) {
    this.start = start;
    this.end = end;
    if (obj13.sourceFile !== null) {
      this.source = obj13.sourceFile;
    }
  };
  function getLineInfo(arg, num23) {
    for (var i3 = 1, i4 = 0;;) {
      var result = fn4(arg, i4, num23);
      if (result < 0) {
        return new Position(i3, num23 - i4);
      }
      ++i3;
      i4 = result;
    }
  }
  var defaultOptions = {
    ecmaVersion: null,
    sourceType: "script",
    onInsertedSemicolon: null,
    onTrailingComma: null,
    allowReserved: null,
    allowReturnOutsideFunction: false,
    allowImportExportEverywhere: false,
    allowAwaitOutsideFunction: null,
    allowSuperOutsideMethod: null,
    allowHashBang: false,
    checkPrivateFields: true,
    locations: false,
    onToken: null,
    onComment: null,
    ranges: false,
    program: null,
    sourceFile: null,
    directSourceFile: null,
    preserveParens: false
  };
  var flag = false;
  function fn9(flag2) {
    var obj13 = {};
    for (var key in defaultOptions) {
      obj13[key] = flag2 && fn5(flag2, key) ? flag2[key] : defaultOptions[key];
    }
    if (obj13.ecmaVersion === "latest") {
      obj13.ecmaVersion = 100000000;
    } else if (obj13.ecmaVersion == null) {
      if (!flag && typeof console === "object" && console.warn) {
        flag = true;
        console.warn("Since Acorn 8.0.0, options.ecmaVersion is required.\nDefaulting to 2020, but this will stop working in the future.");
      }
      obj13.ecmaVersion = 11;
    } else if (obj13.ecmaVersion >= 2015) {
      obj13.ecmaVersion -= 2009;
    }
    if (obj13.allowReserved == null) {
      obj13.allowReserved = obj13.ecmaVersion < 5;
    }
    if (!flag2 || flag2.allowHashBang == null) {
      obj13.allowHashBang = obj13.ecmaVersion >= 14;
    }
    if (fn6(obj13.onToken)) {
      var onToken = obj13.onToken;
      obj13.onToken = function (arg) {
        return onToken.push(arg);
      };
    }
    if (fn6(obj13.onComment)) {
      obj13.onComment = fn10(obj13, obj13.onComment);
    }
    return obj13;
  }
  function fn10(obj13, list4) {
    return function (arg, value, start, end, arg2, arg3) {
      var obj14 = {
        type: arg ? "Block" : "Line",
        value,
        start,
        end
      };
      if (obj13.locations) {
        obj14.loc = new SourceLocation(this, arg2, arg3);
      }
      if (obj13.ranges) {
        obj14.range = [start, end];
      }
      list4.push(obj14);
    };
  }
  var num = 1,
    num2 = 2,
    num3 = 4,
    num4 = 8,
    num5 = 16,
    num6 = 32,
    num7 = 64,
    num8 = 128,
    num9 = 256,
    num10 = num | num2 | num9;
  function fn11(arg, arg2) {
    return num2 | (arg ? num3 : 0) | (arg2 ? num4 : 0);
  }
  var num11 = 0,
    num12 = 1,
    num13 = 2,
    num14 = 3,
    num15 = 4,
    num16 = 5;
  var Parser = function fn40(options, text15, pos) {
    this.options = options = fn9(options);
    this.sourceFile = options.sourceFile;
    this.keywords = fn7(obj2[options.ecmaVersion >= 6 ? 6 : options.sourceType === "module" ? "5module" : 5]);
    var text16 = "";
    if (options.allowReserved !== true) {
      text16 = obj[options.ecmaVersion >= 6 ? 6 : options.ecmaVersion === 5 ? 5 : 3];
      if (options.sourceType === "module") {
        text16 += " await";
      }
    }
    this.reservedWords = fn7(text16);
    var num23 = (text16 ? text16 + " " : "") + obj.strict;
    this.reservedWordsStrict = fn7(num23);
    this.reservedWordsStrictBind = fn7(num23 + " " + obj.strictBind);
    this.input = String(text15);
    this.containsEsc = false;
    if (pos) {
      this.pos = pos;
      this.lineStart = this.input.lastIndexOf("\n", pos - 1) + 1;
      this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length;
    } else {
      this.pos = this.lineStart = 0;
      this.curLine = 1;
    }
    this.type = types$1.eof;
    this.value = null;
    this.start = this.end = this.pos;
    this.startLoc = this.endLoc = this.curPosition();
    this.lastTokEndLoc = this.lastTokStartLoc = null;
    this.lastTokStart = this.lastTokEnd = this.pos;
    this.context = this.initialContext();
    this.exprAllowed = true;
    this.inModule = options.sourceType === "module";
    this.strict = this.inModule || this.strictDirective(this.pos);
    this.potentialArrowAt = -1;
    this.potentialArrowInForAwait = false;
    this.yieldPos = this.awaitPos = this.awaitIdentPos = 0;
    this.labels = [];
    this.undefinedExports = Object.create(null);
    if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === "#!") {
      this.skipLineComment(2);
    }
    this.scopeStack = [];
    this.enterScope(num);
    this.regexpState = null;
    this.privateNameStack = [];
  };
  var obj5 = {
    inFunction: {
      configurable: true
    },
    inGenerator: {
      configurable: true
    },
    inAsync: {
      configurable: true
    },
    canAwait: {
      configurable: true
    },
    allowSuper: {
      configurable: true
    },
    allowDirectSuper: {
      configurable: true
    },
    treatFunctionsAsVar: {
      configurable: true
    },
    allowNewDotTarget: {
      configurable: true
    },
    inClassStaticBlock: {
      configurable: true
    }
  };
  Parser.prototype.parse = function fn40() {
    var startNode = this.options.program || this.startNode();
    this.nextToken();
    return this.parseTopLevel(startNode);
  };
  obj5.inFunction.get = function () {
    return (this.currentVarScope().flags & num2) > 0;
  };
  obj5.inGenerator.get = function () {
    return (this.currentVarScope().flags & num4) > 0 && !this.currentVarScope().inClassFieldInit;
  };
  obj5.inAsync.get = function () {
    return (this.currentVarScope().flags & num3) > 0 && !this.currentVarScope().inClassFieldInit;
  };
  obj5.canAwait.get = function () {
    for (var i3 = this.scopeStack.length - 1; i3 >= 0; i3--) {
      var item2 = this.scopeStack[i3];
      if (item2.inClassFieldInit || item2.flags & num9) {
        return false;
      }
      if (item2.flags & num2) {
        return (item2.flags & num3) > 0;
      }
    }
    return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
  };
  obj5.allowSuper.get = function () {
    var currentThisScope = this.currentThisScope();
    var flags = currentThisScope.flags;
    var inClassFieldInit = currentThisScope.inClassFieldInit;
    return (flags & num7) > 0 || inClassFieldInit || this.options.allowSuperOutsideMethod;
  };
  obj5.allowDirectSuper.get = function () {
    return (this.currentThisScope().flags & num8) > 0;
  };
  obj5.treatFunctionsAsVar.get = function () {
    return this.treatFunctionsAsVarInScope(this.currentScope());
  };
  obj5.allowNewDotTarget.get = function () {
    var currentThisScope = this.currentThisScope();
    var flags = currentThisScope.flags;
    var inClassFieldInit = currentThisScope.inClassFieldInit;
    return (flags & (num2 | num9)) > 0 || inClassFieldInit;
  };
  obj5.inClassStaticBlock.get = function () {
    return (this.currentVarScope().flags & num9) > 0;
  };
  Parser.extend = function fn40() {
    var list4 = [],
      len = arguments.length;
    while (len--) list4[len] = arguments[len];
    var self2 = this;
    for (var i3 = 0; i3 < list4.length; i3++) {
      self2 = list4[i3](self2);
    }
    return self2;
  };
  Parser.parse = function fn40(arg, arg2) {
    return new this(arg2, arg).parse();
  };
  Parser.parseExpressionAt = function fn40(arg, arg2, arg3) {
    var value = new this(arg3, arg, arg2);
    value.nextToken();
    return value.parseExpression();
  };
  Parser.tokenizer = function fn40(arg, arg2) {
    return new this(arg2, arg);
  };
  Object.defineProperties(Parser.prototype, obj5);
  var prototype2 = Parser.prototype;
  var pattern4 = /^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;
  prototype2.strictDirective = function (lastIndex) {
    if (this.options.ecmaVersion < 5) {
      return false;
    }
    for (;;) {
      pattern2.lastIndex = lastIndex;
      lastIndex += pattern2.exec(this.input)[0].length;
      var exec = pattern4.exec(this.input.slice(lastIndex));
      if (!exec) {
        return false;
      }
      if ((exec[1] || exec[2]) === "use strict") {
        pattern2.lastIndex = lastIndex + exec[0].length;
        var exec2 = pattern2.exec(this.input),
          num23 = exec2.index + exec2[0].length;
        var charAt = this.input.charAt(num23);
        return charAt === ";" || charAt === "}" || lineBreak.test(exec2[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(charAt) || charAt === "!" && this.input.charAt(num23 + 1) === "=");
      }
      lastIndex += exec[0].length;
      pattern2.lastIndex = lastIndex;
      lastIndex += pattern2.exec(this.input)[0].length;
      if (this.input[lastIndex] === ";") {
        lastIndex++;
      }
    }
  };
  prototype2.eat = function (arg) {
    if (this.type === arg) {
      this.next();
      return true;
    } else {
      return false;
    }
  };
  prototype2.isContextual = function (arg) {
    return this.type === types$1.name && this.value === arg && !this.containsEsc;
  };
  prototype2.eatContextual = function (arg) {
    if (!this.isContextual(arg)) {
      return false;
    }
    this.next();
    return true;
  };
  prototype2.expectContextual = function (arg) {
    if (!this.eatContextual(arg)) {
      this.unexpected();
    }
  };
  prototype2.canInsertSemicolon = function () {
    return this.type === types$1.eof || this.type === types$1.braceR || lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
  };
  prototype2.insertSemicolon = function () {
    if (this.canInsertSemicolon()) {
      if (this.options.onInsertedSemicolon) {
        this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc);
      }
      return true;
    }
  };
  prototype2.semicolon = function () {
    if (!this.eat(types$1.semi) && !this.insertSemicolon()) {
      this.unexpected();
    }
  };
  prototype2.afterTrailingComma = function (arg, flag2) {
    if (this.type === arg) {
      if (this.options.onTrailingComma) {
        this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc);
      }
      if (!flag2) {
        this.next();
      }
      return true;
    }
  };
  prototype2.expect = function (arg) {
    this.eat(arg) || this.unexpected();
  };
  prototype2.unexpected = function (arg) {
    this.raise(arg != null ? arg : this.start, "Unexpected token");
  };
  var fn12 = function fn40() {
    this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
  };
  prototype2.checkPatternErrors = function (flag2, arg) {
    if (!flag2) {
      return;
    }
    if (flag2.trailingComma > -1) {
      this.raiseRecoverable(flag2.trailingComma, "Comma is not permitted after the rest element");
    }
    var parenthesizedAssign = arg ? flag2.parenthesizedAssign : flag2.parenthesizedBind;
    if (parenthesizedAssign > -1) {
      this.raiseRecoverable(parenthesizedAssign, arg ? "Assigning to rvalue" : "Parenthesized pattern");
    }
  };
  prototype2.checkExpressionErrors = function (flag2, flag3) {
    if (!flag2) {
      return false;
    }
    var shorthandAssign = flag2.shorthandAssign;
    var doubleProto = flag2.doubleProto;
    if (!flag3) {
      return shorthandAssign >= 0 || doubleProto >= 0;
    }
    if (shorthandAssign >= 0) {
      this.raise(shorthandAssign, "Shorthand property assignments are valid only in destructuring patterns");
    }
    if (doubleProto >= 0) {
      this.raiseRecoverable(doubleProto, "Redefinition of __proto__ property");
    }
  };
  prototype2.checkYieldAwaitInDefaultParams = function () {
    if (this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos)) {
      this.raise(this.yieldPos, "Yield expression cannot be a default value");
    }
    if (this.awaitPos) {
      this.raise(this.awaitPos, "Await expression cannot be a default value");
    }
  };
  prototype2.isSimpleAssignTarget = function (obj13) {
    if (obj13.type === "ParenthesizedExpression") {
      return this.isSimpleAssignTarget(obj13.expression);
    }
    return obj13.type === "Identifier" || obj13.type === "MemberExpression";
  };
  var prototype3 = Parser.prototype;
  prototype3.parseTopLevel = function (obj13) {
    var exports = Object.create(null);
    if (!obj13.body) {
      obj13.body = [];
    }
    while (this.type !== types$1.eof) {
      var statement = this.parseStatement(null, true, exports);
      obj13.body.push(statement);
    }
    if (this.inModule) {
      for (var i3 = 0, i4 = Object.keys(this.undefinedExports); i3 < i4.length; i3 += 1) {
        var item2 = i4[i3];
        this.raiseRecoverable(this.undefinedExports[item2].start, "Export '" + item2 + "' is not defined");
      }
    }
    this.adaptDirectivePrologue(obj13.body);
    this.next();
    obj13.sourceType = this.options.sourceType;
    return this.finishNode(obj13, "Program");
  };
  var obj6 = {
      kind: "loop"
    },
    obj7 = {
      kind: "switch"
    };
  prototype3.isLet = function (arg) {
    if (this.options.ecmaVersion < 6 || !this.isContextual("let")) {
      return false;
    }
    pattern2.lastIndex = this.pos;
    var exec = pattern2.exec(this.input);
    var num23 = this.pos + exec[0].length,
      charCodeAt = this.input.charCodeAt(num23);
    if (charCodeAt === 91 || charCodeAt === 92) {
      return true;
    }
    if (arg) {
      return false;
    }
    if (charCodeAt === 123 || charCodeAt > 55295 && charCodeAt < 56320) {
      return true;
    }
    if (isIdentifierStart(charCodeAt, true)) {
      var num24 = num23 + 1;
      while (isIdentifierChar(charCodeAt = this.input.charCodeAt(num24), true)) {
        ++num24;
      }
      if (charCodeAt === 92 || charCodeAt > 55295 && charCodeAt < 56320) {
        return true;
      }
      var part = this.input.slice(num23, num24);
      if (!pattern.test(part)) {
        return true;
      }
    }
    return false;
  };
  prototype3.isAsyncFunction = function () {
    if (this.options.ecmaVersion < 8 || !this.isContextual("async")) {
      return false;
    }
    pattern2.lastIndex = this.pos;
    var exec = pattern2.exec(this.input);
    var num23 = this.pos + exec[0].length,
      charCodeAt;
    return !lineBreak.test(this.input.slice(this.pos, num23)) && this.input.slice(num23, num23 + 8) === "function" && (num23 + 8 === this.input.length || !(isIdentifierChar(charCodeAt = this.input.charCodeAt(num23 + 8)) || charCodeAt > 55295 && charCodeAt < 56320));
  };
  prototype3.parseStatement = function (flag2, flag3, exports) {
    var type = this.type,
      startNode = this.startNode(),
      text15;
    if (this.isLet(flag2)) {
      type = types$1._var;
      text15 = "let";
    }
    switch (type) {
      case types$1._break:
      case types$1._continue:
        return this.parseBreakContinueStatement(startNode, type.keyword);
      case types$1._debugger:
        return this.parseDebuggerStatement(startNode);
      case types$1._do:
        return this.parseDoStatement(startNode);
      case types$1._for:
        return this.parseForStatement(startNode);
      case types$1._function:
        if (flag2 && (this.strict || flag2 !== "if" && flag2 !== "label") && this.options.ecmaVersion >= 6) {
          this.unexpected();
        }
        return this.parseFunctionStatement(startNode, false, !flag2);
      case types$1._class:
        if (flag2) {
          this.unexpected();
        }
        return this.parseClass(startNode, true);
      case types$1._if:
        return this.parseIfStatement(startNode);
      case types$1._return:
        return this.parseReturnStatement(startNode);
      case types$1._switch:
        return this.parseSwitchStatement(startNode);
      case types$1._throw:
        return this.parseThrowStatement(startNode);
      case types$1._try:
        return this.parseTryStatement(startNode);
      case types$1._const:
      case types$1._var:
        text15 = text15 || this.value;
        if (flag2 && text15 !== "var") {
          this.unexpected();
        }
        return this.parseVarStatement(startNode, text15);
      case types$1._while:
        return this.parseWhileStatement(startNode);
      case types$1._with:
        return this.parseWithStatement(startNode);
      case types$1.braceL:
        return this.parseBlock(true, startNode);
      case types$1.semi:
        return this.parseEmptyStatement(startNode);
      case types$1._export:
      case types$1._import:
        if (this.options.ecmaVersion > 10 && type === types$1._import) {
          pattern2.lastIndex = this.pos;
          var exec = pattern2.exec(this.input);
          var num23 = this.pos + exec[0].length,
            charCodeAt = this.input.charCodeAt(num23);
          if (charCodeAt === 40 || charCodeAt === 46) {
            return this.parseExpressionStatement(startNode, this.parseExpression());
          }
        }
        if (!this.options.allowImportExportEverywhere) {
          if (!flag3) {
            this.raise(this.start, "'import' and 'export' may only appear at the top level");
          }
          if (!this.inModule) {
            this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'");
          }
        }
        return type === types$1._import ? this.parseImport(startNode) : this.parseExport(startNode, exports);
      default:
        if (this.isAsyncFunction()) {
          if (flag2) {
            this.unexpected();
          }
          this.next();
          return this.parseFunctionStatement(startNode, true, !flag2);
        }
        var value = this.value,
          expression = this.parseExpression();
        if (type === types$1.name && expression.type === "Identifier" && this.eat(types$1.colon)) {
          return this.parseLabeledStatement(startNode, value, expression, flag2);
        } else {
          return this.parseExpressionStatement(startNode, expression);
        }
    }
  };
  prototype3.parseBreakContinueStatement = function (obj13, arg) {
    var flag2 = arg === "break";
    this.next();
    if (this.eat(types$1.semi) || this.insertSemicolon()) {
      obj13.label = null;
    } else if (this.type !== types$1.name) {
      this.unexpected();
    } else {
      obj13.label = this.parseIdent();
      this.semicolon();
    }
    var num23 = 0;
    for (; num23 < this.labels.length; ++num23) {
      var lab = this.labels[num23];
      if (obj13.label == null || lab.name === obj13.label.name) {
        if (lab.kind != null && (flag2 || lab.kind === "loop")) {
          break;
        }
        if (obj13.label && flag2) {
          break;
        }
      }
    }
    if (num23 === this.labels.length) {
      this.raise(obj13.start, "Unsyntactic " + arg);
    }
    return this.finishNode(obj13, flag2 ? "BreakStatement" : "ContinueStatement");
  };
  prototype3.parseDebuggerStatement = function (arg) {
    this.next();
    this.semicolon();
    return this.finishNode(arg, "DebuggerStatement");
  };
  prototype3.parseDoStatement = function (obj13) {
    this.next();
    this.labels.push(obj6);
    obj13.body = this.parseStatement("do");
    this.labels.pop();
    this.expect(types$1._while);
    obj13.test = this.parseParenExpression();
    if (this.options.ecmaVersion >= 6) {
      this.eat(types$1.semi);
    } else {
      this.semicolon();
    }
    return this.finishNode(obj13, "DoWhileStatement");
  };
  prototype3.parseForStatement = function (obj13) {
    this.next();
    var lastTokStart = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
    this.labels.push(obj6);
    this.enterScope(0);
    this.expect(types$1.parenL);
    if (this.type === types$1.semi) {
      if (lastTokStart > -1) {
        this.unexpected(lastTokStart);
      }
      return this.parseFor(obj13, null);
    }
    var isLet = this.isLet();
    if (this.type === types$1._var || this.type === types$1._const || isLet) {
      var startNode = this.startNode(),
        text15 = isLet ? "let" : this.value;
      this.next();
      this.parseVar(startNode, true, text15);
      this.finishNode(startNode, "VariableDeclaration");
      if ((this.type === types$1._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && startNode.declarations.length === 1) {
        if (this.options.ecmaVersion >= 9) {
          if (this.type === types$1._in) {
            if (lastTokStart > -1) {
              this.unexpected(lastTokStart);
            }
          } else {
            obj13.await = lastTokStart > -1;
          }
        }
        return this.parseForIn(obj13, startNode);
      }
      if (lastTokStart > -1) {
        this.unexpected(lastTokStart);
      }
      return this.parseFor(obj13, startNode);
    }
    var isContextual = this.isContextual("let"),
      flag2 = false;
    var containsEsc = this.containsEsc;
    var fn122 = new fn12();
    var start = this.start;
    var init = lastTokStart > -1 ? this.parseExprSubscripts(fn122, "await") : this.parseExpression(true, fn122);
    if (this.type === types$1._in || (flag2 = this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
      if (lastTokStart > -1) {
        if (this.type === types$1._in) {
          this.unexpected(lastTokStart);
        }
        obj13.await = true;
      } else if (flag2 && this.options.ecmaVersion >= 8) {
        if (init.start === start && !containsEsc && init.type === "Identifier" && init.name === "async") {
          this.unexpected();
        } else if (this.options.ecmaVersion >= 9) {
          obj13.await = false;
        }
      }
      if (isContextual && flag2) {
        this.raise(init.start, "The left-hand side of a for-of loop may not start with 'let'.");
      }
      this.toAssignable(init, false, fn122);
      this.checkLValPattern(init);
      return this.parseForIn(obj13, init);
    } else {
      this.checkExpressionErrors(fn122, true);
    }
    if (lastTokStart > -1) {
      this.unexpected(lastTokStart);
    }
    return this.parseFor(obj13, init);
  };
  prototype3.parseFunctionStatement = function (arg, arg2, arg3) {
    this.next();
    return this.parseFunction(arg, num17 | (arg3 ? 0 : num18), false, arg2);
  };
  prototype3.parseIfStatement = function (options) {
    this.next();
    options.test = this.parseParenExpression();
    options.consequent = this.parseStatement("if");
    options.alternate = this.eat(types$1._else) ? this.parseStatement("if") : null;
    return this.finishNode(options, "IfStatement");
  };
  prototype3.parseReturnStatement = function (obj13) {
    if (!this.inFunction && !this.options.allowReturnOutsideFunction) {
      this.raise(this.start, "'return' outside of function");
    }
    this.next();
    if (this.eat(types$1.semi) || this.insertSemicolon()) {
      obj13.argument = null;
    } else {
      obj13.argument = this.parseExpression();
      this.semicolon();
    }
    return this.finishNode(obj13, "ReturnStatement");
  };
  prototype3.parseSwitchStatement = function (obj13) {
    this.next();
    obj13.discriminant = this.parseParenExpression();
    obj13.cases = [];
    this.expect(types$1.braceL);
    this.labels.push(obj7);
    this.enterScope(0);
    var startNode;
    for (var i3 = false; this.type !== types$1.braceR;) {
      if (this.type === types$1._case || this.type === types$1._default) {
        var flag2 = this.type === types$1._case;
        if (startNode) {
          this.finishNode(startNode, "SwitchCase");
        }
        obj13.cases.push(startNode = this.startNode());
        startNode.consequent = [];
        this.next();
        if (flag2) {
          startNode.test = this.parseExpression();
        } else {
          if (i3) {
            this.raiseRecoverable(this.lastTokStart, "Multiple default clauses");
          }
          i3 = true;
          startNode.test = null;
        }
        this.expect(types$1.colon);
      } else {
        if (!startNode) {
          this.unexpected();
        }
        startNode.consequent.push(this.parseStatement(null));
      }
    }
    this.exitScope();
    if (startNode) {
      this.finishNode(startNode, "SwitchCase");
    }
    this.next();
    this.labels.pop();
    return this.finishNode(obj13, "SwitchStatement");
  };
  prototype3.parseThrowStatement = function (obj13) {
    this.next();
    if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) {
      this.raise(this.lastTokEnd, "Illegal newline after throw");
    }
    obj13.argument = this.parseExpression();
    this.semicolon();
    return this.finishNode(obj13, "ThrowStatement");
  };
  var specifiers = [];
  prototype3.parseCatchClauseParam = function () {
    var bindingAtom = this.parseBindingAtom();
    var flag2 = bindingAtom.type === "Identifier";
    this.enterScope(flag2 ? num6 : 0);
    this.checkLValPattern(bindingAtom, flag2 ? num15 : num13);
    this.expect(types$1.parenR);
    return bindingAtom;
  };
  prototype3.parseTryStatement = function (options) {
    this.next();
    options.block = this.parseBlock();
    options.handler = null;
    if (this.type === types$1._catch) {
      var startNode = this.startNode();
      this.next();
      if (this.eat(types$1.parenL)) {
        startNode.param = this.parseCatchClauseParam();
      } else {
        if (this.options.ecmaVersion < 10) {
          this.unexpected();
        }
        startNode.param = null;
        this.enterScope(0);
      }
      startNode.body = this.parseBlock(false);
      this.exitScope();
      options.handler = this.finishNode(startNode, "CatchClause");
    }
    options.finalizer = this.eat(types$1._finally) ? this.parseBlock() : null;
    if (!options.handler && !options.finalizer) {
      this.raise(options.start, "Missing catch or finally clause");
    }
    return this.finishNode(options, "TryStatement");
  };
  prototype3.parseVarStatement = function (arg, arg2, arg3) {
    this.next();
    this.parseVar(arg, false, arg2, arg3);
    this.semicolon();
    return this.finishNode(arg, "VariableDeclaration");
  };
  prototype3.parseWhileStatement = function (obj13) {
    this.next();
    obj13.test = this.parseParenExpression();
    this.labels.push(obj6);
    obj13.body = this.parseStatement("while");
    this.labels.pop();
    return this.finishNode(obj13, "WhileStatement");
  };
  prototype3.parseWithStatement = function (obj13) {
    if (this.strict) {
      this.raise(this.start, "'with' in strict mode");
    }
    this.next();
    obj13.object = this.parseParenExpression();
    obj13.body = this.parseStatement("with");
    return this.finishNode(obj13, "WithStatement");
  };
  prototype3.parseEmptyStatement = function (arg) {
    this.next();
    return this.finishNode(arg, "EmptyStatement");
  };
  prototype3.parseLabeledStatement = function (options, name, label2, obj13) {
    for (var i3 = 0, i4 = this.labels; i3 < i4.length; i3 += 1) {
      var label = i4[i3];
      if (label.name === name) {
        this.raise(label2.start, "Label '" + name + "' is already declared");
      }
    }
    var kind = this.type.isLoop ? "loop" : this.type === types$1._switch ? "switch" : null;
    for (var i5 = this.labels.length - 1; i5 >= 0; i5--) {
      var item2 = this.labels[i5];
      if (item2.statementStart === options.start) {
        item2.statementStart = this.start;
        item2.kind = kind;
      } else {
        break;
      }
    }
    this.labels.push({
      name,
      kind,
      statementStart: this.start
    });
    options.body = this.parseStatement(obj13 ? obj13.indexOf("label") === -1 ? obj13 + "label" : obj13 : "label");
    this.labels.pop();
    options.label = label2;
    return this.finishNode(options, "LabeledStatement");
  };
  prototype3.parseExpressionStatement = function (obj13, expression) {
    obj13.expression = expression;
    this.semicolon();
    return this.finishNode(obj13, "ExpressionStatement");
  };
  prototype3.parseBlock = function (arg, obj13, arg2) {
    if (arg === void 0) arg = true;
    if (obj13 === void 0) obj13 = this.startNode();
    obj13.body = [];
    this.expect(types$1.braceL);
    if (arg) {
      this.enterScope(0);
    }
    while (this.type !== types$1.braceR) {
      var statement = this.parseStatement(null);
      obj13.body.push(statement);
    }
    if (arg2) {
      this.strict = false;
    }
    this.next();
    if (arg) {
      this.exitScope();
    }
    return this.finishNode(obj13, "BlockStatement");
  };
  prototype3.parseFor = function (options, init) {
    options.init = init;
    this.expect(types$1.semi);
    options.test = this.type === types$1.semi ? null : this.parseExpression();
    this.expect(types$1.semi);
    options.update = this.type === types$1.parenR ? null : this.parseExpression();
    this.expect(types$1.parenR);
    options.body = this.parseStatement("for");
    this.exitScope();
    this.labels.pop();
    return this.finishNode(options, "ForStatement");
  };
  prototype3.parseForIn = function (options, left) {
    var flag2 = this.type === types$1._in;
    this.next();
    if (left.type === "VariableDeclaration" && left.declarations[0].init != null && (!flag2 || this.options.ecmaVersion < 8 || this.strict || left.kind !== "var" || left.declarations[0].id.type !== "Identifier")) {
      this.raise(left.start, (flag2 ? "for-in" : "for-of") + " loop variable declaration may not have an initializer");
    }
    options.left = left;
    options.right = flag2 ? this.parseExpression() : this.parseMaybeAssign();
    this.expect(types$1.parenR);
    options.body = this.parseStatement("for");
    this.exitScope();
    this.labels.pop();
    return this.finishNode(options, flag2 ? "ForInStatement" : "ForOfStatement");
  };
  prototype3.parseVar = function (obj13, arg, kind, flag2) {
    obj13.declarations = [];
    obj13.kind = kind;
    for (;;) {
      var startNode = this.startNode();
      this.parseVarId(startNode, kind);
      if (this.eat(types$1.eq)) {
        startNode.init = this.parseMaybeAssign(arg);
      } else if (!flag2 && kind === "const" && !(this.type === types$1._in || this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
        this.unexpected();
      } else if (!flag2 && startNode.id.type !== "Identifier" && !(arg && (this.type === types$1._in || this.isContextual("of")))) {
        this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value");
      } else {
        startNode.init = null;
      }
      obj13.declarations.push(this.finishNode(startNode, "VariableDeclarator"));
      if (!this.eat(types$1.comma)) {
        break;
      }
    }
    return obj13;
  };
  prototype3.parseVarId = function (obj13, arg) {
    obj13.id = this.parseBindingAtom();
    this.checkLValPattern(obj13.id, arg === "var" ? num12 : num13, false);
  };
  var num17 = 1,
    num18 = 2,
    num19 = 4;
  prototype3.parseFunction = function (options, num23, arg, flag2, arg2) {
    this.initFunction(options);
    if (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !flag2) {
      if (this.type === types$1.star && num23 & num18) {
        this.unexpected();
      }
      options.generator = this.eat(types$1.star);
    }
    if (this.options.ecmaVersion >= 8) {
      options.async = !!flag2;
    }
    if (num23 & num17) {
      options.id = num23 & num19 && this.type !== types$1.name ? null : this.parseIdent();
      if (options.id && !(num23 & num18)) {
        this.checkLValSimple(options.id, this.strict || options.generator || options.async ? this.treatFunctionsAsVar ? num12 : num13 : num14);
      }
    }
    var yieldPos = this.yieldPos,
      awaitPos = this.awaitPos,
      awaitIdentPos = this.awaitIdentPos;
    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;
    this.enterScope(fn11(options.async, options.generator));
    if (!(num23 & num17)) {
      options.id = this.type === types$1.name ? this.parseIdent() : null;
    }
    this.parseFunctionParams(options);
    this.parseFunctionBody(options, arg, false, arg2);
    this.yieldPos = yieldPos;
    this.awaitPos = awaitPos;
    this.awaitIdentPos = awaitIdentPos;
    return this.finishNode(options, num23 & num17 ? "FunctionDeclaration" : "FunctionExpression");
  };
  prototype3.parseFunctionParams = function (obj13) {
    this.expect(types$1.parenL);
    obj13.params = this.parseBindingList(types$1.parenR, false, this.options.ecmaVersion >= 8);
    this.checkYieldAwaitInDefaultParams();
  };
  prototype3.parseClass = function (obj13, arg) {
    this.next();
    var strict = this.strict;
    this.strict = true;
    this.parseClassId(obj13, arg);
    this.parseClassSuper(obj13);
    var enterClassBody = this.enterClassBody();
    var startNode = this.startNode();
    var flag2 = false;
    startNode.body = [];
    this.expect(types$1.braceL);
    while (this.type !== types$1.braceR) {
      var classElement = this.parseClassElement(obj13.superClass !== null);
      if (classElement) {
        startNode.body.push(classElement);
        if (classElement.type === "MethodDefinition" && classElement.kind === "constructor") {
          if (flag2) {
            this.raiseRecoverable(classElement.start, "Duplicate constructor in the same class");
          }
          flag2 = true;
        } else if (classElement.key && classElement.key.type === "PrivateIdentifier" && fn13(enterClassBody, classElement)) {
          this.raiseRecoverable(classElement.key.start, "Identifier '#" + classElement.key.name + "' has already been declared");
        }
      }
    }
    this.strict = strict;
    this.next();
    obj13.body = this.finishNode(startNode, "ClassBody");
    this.exitClassBody();
    return this.finishNode(obj13, arg ? "ClassDeclaration" : "ClassExpression");
  };
  prototype3.parseClassElement = function (arg) {
    if (this.eat(types$1.semi)) {
      return null;
    }
    var ecmaVersion = this.options.ecmaVersion;
    var startNode = this.startNode();
    var name = "";
    var flag2 = false;
    var flag3 = false;
    var text15 = "method";
    var flag4 = false;
    if (this.eatContextual("static")) {
      if (ecmaVersion >= 13 && this.eat(types$1.braceL)) {
        this.parseClassStaticBlock(startNode);
        return startNode;
      }
      if (this.isClassElementNameStart() || this.type === types$1.star) {
        flag4 = true;
      } else {
        name = "static";
      }
    }
    startNode.static = flag4;
    if (!name && ecmaVersion >= 8 && this.eatContextual("async")) {
      if ((this.isClassElementNameStart() || this.type === types$1.star) && !this.canInsertSemicolon()) {
        flag3 = true;
      } else {
        name = "async";
      }
    }
    if (!name && (ecmaVersion >= 9 || !flag3) && this.eat(types$1.star)) {
      flag2 = true;
    }
    if (!name && !flag3 && !flag2) {
      var value = this.value;
      if (this.eatContextual("get") || this.eatContextual("set")) {
        if (this.isClassElementNameStart()) {
          text15 = value;
        } else {
          name = value;
        }
      }
    }
    if (name) {
      startNode.computed = false;
      startNode.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc);
      startNode.key.name = name;
      this.finishNode(startNode.key, "Identifier");
    } else {
      this.parseClassElementName(startNode);
    }
    if (ecmaVersion < 13 || this.type === types$1.parenL || text15 !== "method" || flag2 || flag3) {
      var result = !startNode.static && fn14(startNode, "constructor");
      var arg2 = result && arg;
      if (result && text15 !== "method") {
        this.raise(startNode.key.start, "Constructor can't have get/set modifier");
      }
      startNode.kind = result ? "constructor" : text15;
      this.parseClassMethod(startNode, flag2, flag3, arg2);
    } else {
      this.parseClassField(startNode);
    }
    return startNode;
  };
  prototype3.isClassElementNameStart = function () {
    return this.type === types$1.name || this.type === types$1.privateId || this.type === types$1.num || this.type === types$1.string || this.type === types$1.bracketL || this.type.keyword;
  };
  prototype3.parseClassElementName = function (obj13) {
    if (this.type === types$1.privateId) {
      if (this.value === "constructor") {
        this.raise(this.start, "Classes can't have an element named '#constructor'");
      }
      obj13.computed = false;
      obj13.key = this.parsePrivateIdent();
    } else {
      this.parsePropertyName(obj13);
    }
  };
  prototype3.parseClassMethod = function (options, arg, arg2, arg3) {
    var key = options.key;
    if (options.kind === "constructor") {
      if (arg) {
        this.raise(key.start, "Constructor can't be a generator");
      }
      if (arg2) {
        this.raise(key.start, "Constructor can't be an async method");
      }
    } else if (options.static && fn14(options, "prototype")) {
      this.raise(key.start, "Classes may not have a static property named prototype");
    }
    var method = options.value = this.parseMethod(arg, arg2, arg3);
    if (options.kind === "get" && method.params.length !== 0) {
      this.raiseRecoverable(method.start, "getter should have no params");
    }
    if (options.kind === "set" && method.params.length !== 1) {
      this.raiseRecoverable(method.start, "setter should have exactly one param");
    }
    if (options.kind === "set" && method.params[0].type === "RestElement") {
      this.raiseRecoverable(method.params[0].start, "Setter cannot use rest params");
    }
    return this.finishNode(options, "MethodDefinition");
  };
  prototype3.parseClassField = function (options) {
    if (fn14(options, "constructor")) {
      this.raise(options.key.start, "Classes can't have a field named 'constructor'");
    } else if (options.static && fn14(options, "prototype")) {
      this.raise(options.key.start, "Classes can't have a static field named 'prototype'");
    }
    if (this.eat(types$1.eq)) {
      var currentThisScope = this.currentThisScope();
      var inClassFieldInit = currentThisScope.inClassFieldInit;
      currentThisScope.inClassFieldInit = true;
      options.value = this.parseMaybeAssign();
      currentThisScope.inClassFieldInit = inClassFieldInit;
    } else {
      options.value = null;
    }
    this.semicolon();
    return this.finishNode(options, "PropertyDefinition");
  };
  prototype3.parseClassStaticBlock = function (obj13) {
    obj13.body = [];
    var labels = this.labels;
    this.labels = [];
    this.enterScope(num9 | num7);
    while (this.type !== types$1.braceR) {
      var statement = this.parseStatement(null);
      obj13.body.push(statement);
    }
    this.next();
    this.exitScope();
    this.labels = labels;
    return this.finishNode(obj13, "StaticBlock");
  };
  prototype3.parseClassId = function (obj13, arg) {
    if (this.type === types$1.name) {
      obj13.id = this.parseIdent();
      if (arg) {
        this.checkLValSimple(obj13.id, num13, false);
      }
    } else {
      if (arg === true) {
        this.unexpected();
      }
      obj13.id = null;
    }
  };
  prototype3.parseClassSuper = function (obj13) {
    obj13.superClass = this.eat(types$1._extends) ? this.parseExprSubscripts(null, false) : null;
  };
  prototype3.enterClassBody = function () {
    var obj13 = {
      declared: Object.create(null),
      used: []
    };
    this.privateNameStack.push(obj13);
    return obj13.declared;
  };
  prototype3.exitClassBody = function () {
    var item2 = this.privateNameStack.pop();
    var declared = item2.declared;
    var used = item2.used;
    if (!this.options.checkPrivateFields) {
      return;
    }
    var len = this.privateNameStack.length;
    var value = len === 0 ? null : this.privateNameStack[len - 1];
    for (var i3 = 0; i3 < used.length; ++i3) {
      var id = used[i3];
      if (!fn5(declared, id.name)) {
        if (value) {
          value.used.push(id);
        } else {
          this.raiseRecoverable(id.start, "Private field '#" + id.name + "' must be declared in an enclosing class");
        }
      }
    }
  };
  function fn13(list4, options) {
    var name = options.key.name;
    var item2 = list4[name];
    var text15 = "true";
    if (options.type === "MethodDefinition" && (options.kind === "get" || options.kind === "set")) {
      text15 = (options.static ? "s" : "i") + options.kind;
    }
    if (item2 === "iget" && text15 === "iset" || item2 === "iset" && text15 === "iget" || item2 === "sget" && text15 === "sset" || item2 === "sset" && text15 === "sget") {
      list4[name] = "true";
      return false;
    } else if (!item2) {
      list4[name] = text15;
      return false;
    } else {
      return true;
    }
  }
  function fn14(obj13, arg) {
    var computed = obj13.computed;
    var key = obj13.key;
    return !computed && (key.type === "Identifier" && key.name === arg || key.type === "Literal" && key.value === arg);
  }
  prototype3.parseExportAllDeclaration = function (obj13, exports) {
    if (this.options.ecmaVersion >= 11) {
      if (this.eatContextual("as")) {
        obj13.exported = this.parseModuleExportName();
        this.checkExport(exports, obj13.exported, this.lastTokStart);
      } else {
        obj13.exported = null;
      }
    }
    this.expectContextual("from");
    if (this.type !== types$1.string) {
      this.unexpected();
    }
    obj13.source = this.parseExprAtom();
    this.semicolon();
    return this.finishNode(obj13, "ExportAllDeclaration");
  };
  prototype3.parseExport = function (options, exports) {
    this.next();
    if (this.eat(types$1.star)) {
      return this.parseExportAllDeclaration(options, exports);
    }
    if (this.eat(types$1._default)) {
      this.checkExport(exports, "default", this.lastTokStart);
      options.declaration = this.parseExportDefaultDeclaration();
      return this.finishNode(options, "ExportDefaultDeclaration");
    }
    if (this.shouldParseExportStatement()) {
      options.declaration = this.parseExportDeclaration(options);
      if (options.declaration.type === "VariableDeclaration") {
        this.checkVariableExport(exports, options.declaration.declarations);
      } else {
        this.checkExport(exports, options.declaration.id, options.declaration.id.start);
      }
      options.specifiers = [];
      options.source = null;
    } else {
      options.declaration = null;
      options.specifiers = this.parseExportSpecifiers(exports);
      if (this.eatContextual("from")) {
        if (this.type !== types$1.string) {
          this.unexpected();
        }
        options.source = this.parseExprAtom();
      } else {
        for (var i3 = 0, i4 = options.specifiers; i3 < i4.length; i3 += 1) {
          var item2 = i4[i3];
          this.checkUnreserved(item2.local);
          this.checkLocalExport(item2.local);
          if (item2.local.type === "Literal") {
            this.raise(item2.local.start, "A string literal cannot be used as an exported binding without `from`.");
          }
        }
        options.source = null;
      }
      this.semicolon();
    }
    return this.finishNode(options, "ExportNamedDeclaration");
  };
  prototype3.parseExportDeclaration = function (arg) {
    return this.parseStatement(null);
  };
  prototype3.parseExportDefaultDeclaration = function () {
    var isAsyncFunction;
    if (this.type === types$1._function || (isAsyncFunction = this.isAsyncFunction())) {
      var startNode = this.startNode();
      this.next();
      if (isAsyncFunction) {
        this.next();
      }
      return this.parseFunction(startNode, num17 | num19, false, isAsyncFunction);
    } else if (this.type === types$1._class) {
      var startNode2 = this.startNode();
      return this.parseClass(startNode2, "nullableID");
    } else {
      var maybeAssign = this.parseMaybeAssign();
      this.semicolon();
      return maybeAssign;
    }
  };
  prototype3.checkExport = function (exports, name, arg) {
    if (!exports) {
      return;
    }
    if (typeof name !== "string") {
      name = name.type === "Identifier" ? name.name : name.value;
    }
    if (fn5(exports, name)) {
      this.raiseRecoverable(arg, "Duplicate export '" + name + "'");
    }
    exports[name] = true;
  };
  prototype3.checkPatternExport = function (exports, options) {
    var type = options.type;
    if (type === "Identifier") {
      this.checkExport(exports, options, options.start);
    } else if (type === "ObjectPattern") {
      for (var i3 = 0, i4 = options.properties; i3 < i4.length; i3 += 1) {
        var item2 = i4[i3];
        this.checkPatternExport(exports, item2);
      }
    } else if (type === "ArrayPattern") {
      for (var i5 = 0, i6 = options.elements; i5 < i6.length; i5 += 1) {
        var item3 = i6[i5];
        if (item3) {
          this.checkPatternExport(exports, item3);
        }
      }
    } else if (type === "Property") {
      this.checkPatternExport(exports, options.value);
    } else if (type === "AssignmentPattern") {
      this.checkPatternExport(exports, options.left);
    } else if (type === "RestElement") {
      this.checkPatternExport(exports, options.argument);
    }
  };
  prototype3.checkVariableExport = function (exports, arg) {
    if (!exports) {
      return;
    }
    for (var i3 = 0, i4 = arg; i3 < i4.length; i3 += 1) {
      var item2 = i4[i3];
      this.checkPatternExport(exports, item2.id);
    }
  };
  prototype3.shouldParseExportStatement = function () {
    return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
  };
  prototype3.parseExportSpecifier = function (exports) {
    var startNode = this.startNode();
    startNode.local = this.parseModuleExportName();
    startNode.exported = this.eatContextual("as") ? this.parseModuleExportName() : startNode.local;
    this.checkExport(exports, startNode.exported, startNode.exported.start);
    return this.finishNode(startNode, "ExportSpecifier");
  };
  prototype3.parseExportSpecifiers = function (exports) {
    var list4 = [],
      flag2 = true;
    this.expect(types$1.braceL);
    while (!this.eat(types$1.braceR)) {
      if (!flag2) {
        this.expect(types$1.comma);
        if (this.afterTrailingComma(types$1.braceR)) {
          break;
        }
      } else {
        flag2 = false;
      }
      list4.push(this.parseExportSpecifier(exports));
    }
    return list4;
  };
  prototype3.parseImport = function (obj13) {
    this.next();
    if (this.type === types$1.string) {
      obj13.specifiers = specifiers;
      obj13.source = this.parseExprAtom();
    } else {
      obj13.specifiers = this.parseImportSpecifiers();
      this.expectContextual("from");
      obj13.source = this.type === types$1.string ? this.parseExprAtom() : this.unexpected();
    }
    this.semicolon();
    return this.finishNode(obj13, "ImportDeclaration");
  };
  prototype3.parseImportSpecifier = function () {
    var startNode = this.startNode();
    startNode.imported = this.parseModuleExportName();
    if (this.eatContextual("as")) {
      startNode.local = this.parseIdent();
    } else {
      this.checkUnreserved(startNode.imported);
      startNode.local = startNode.imported;
    }
    this.checkLValSimple(startNode.local, num13);
    return this.finishNode(startNode, "ImportSpecifier");
  };
  prototype3.parseImportDefaultSpecifier = function () {
    var startNode = this.startNode();
    startNode.local = this.parseIdent();
    this.checkLValSimple(startNode.local, num13);
    return this.finishNode(startNode, "ImportDefaultSpecifier");
  };
  prototype3.parseImportNamespaceSpecifier = function () {
    var startNode = this.startNode();
    this.next();
    this.expectContextual("as");
    startNode.local = this.parseIdent();
    this.checkLValSimple(startNode.local, num13);
    return this.finishNode(startNode, "ImportNamespaceSpecifier");
  };
  prototype3.parseImportSpecifiers = function () {
    var list4 = [],
      flag2 = true;
    if (this.type === types$1.name) {
      list4.push(this.parseImportDefaultSpecifier());
      if (!this.eat(types$1.comma)) {
        return list4;
      }
    }
    if (this.type === types$1.star) {
      list4.push(this.parseImportNamespaceSpecifier());
      return list4;
    }
    this.expect(types$1.braceL);
    while (!this.eat(types$1.braceR)) {
      if (!flag2) {
        this.expect(types$1.comma);
        if (this.afterTrailingComma(types$1.braceR)) {
          break;
        }
      } else {
        flag2 = false;
      }
      list4.push(this.parseImportSpecifier());
    }
    return list4;
  };
  prototype3.parseModuleExportName = function () {
    if (this.options.ecmaVersion >= 13 && this.type === types$1.string) {
      var literal = this.parseLiteral(this.value);
      if (pattern3.test(literal.value)) {
        this.raise(literal.start, "An export name cannot include a lone surrogate.");
      }
      return literal;
    }
    return this.parseIdent(true);
  };
  prototype3.adaptDirectivePrologue = function (list4) {
    for (var i3 = 0; i3 < list4.length && this.isDirectiveCandidate(list4[i3]); ++i3) {
      list4[i3].directive = list4[i3].expression.raw.slice(1, -1);
    }
  };
  prototype3.isDirectiveCandidate = function (options) {
    return this.options.ecmaVersion >= 5 && options.type === "ExpressionStatement" && options.expression.type === "Literal" && typeof options.expression.value === "string" && (this.input[options.start] === "\"" || this.input[options.start] === "'");
  };
  var prototype4 = Parser.prototype;
  prototype4.toAssignable = function (node, flag2, arg) {
    if (this.options.ecmaVersion >= 6 && node) {
      switch (node.type) {
        case "Identifier":
          if (this.inAsync && node.name === "await") {
            this.raise(node.start, "Cannot use 'await' as identifier inside an async function");
          }
          break;
        case "ObjectPattern":
        case "ArrayPattern":
        case "AssignmentPattern":
        case "RestElement":
          break;
        case "ObjectExpression":
          node.type = "ObjectPattern";
          if (arg) {
            this.checkPatternErrors(arg, true);
          }
          for (var i3 = 0, i4 = node.properties; i3 < i4.length; i3 += 1) {
            var item2 = i4[i3];
            this.toAssignable(item2, flag2);
            if (item2.type === "RestElement" && (item2.argument.type === "ArrayPattern" || item2.argument.type === "ObjectPattern")) {
              this.raise(item2.argument.start, "Unexpected token");
            }
          }
          break;
        case "Property":
          if (node.kind !== "init") {
            this.raise(node.key.start, "Object pattern can't contain getter or setter");
          }
          this.toAssignable(node.value, flag2);
          break;
        case "ArrayExpression":
          node.type = "ArrayPattern";
          if (arg) {
            this.checkPatternErrors(arg, true);
          }
          this.toAssignableList(node.elements, flag2);
          break;
        case "SpreadElement":
          node.type = "RestElement";
          this.toAssignable(node.argument, flag2);
          if (node.argument.type === "AssignmentPattern") {
            this.raise(node.argument.start, "Rest elements cannot have a default value");
          }
          break;
        case "AssignmentExpression":
          if (node.operator !== "=") {
            this.raise(node.left.end, "Only '=' operator can be used for specifying default value.");
          }
          node.type = "AssignmentPattern";
          delete node.operator;
          this.toAssignable(node.left, flag2);
          break;
        case "ParenthesizedExpression":
          this.toAssignable(node.expression, flag2, arg);
          break;
        case "ChainExpression":
          this.raiseRecoverable(node.start, "Optional chaining cannot appear in left-hand side");
          break;
        case "MemberExpression":
          if (!flag2) {
            break;
          }
        default:
          this.raise(node.start, "Assigning to rvalue");
      }
    } else if (arg) {
      this.checkPatternErrors(arg, true);
    }
    return node;
  };
  prototype4.toAssignableList = function (list4, arg) {
    var len = list4.length;
    for (var i3 = 0; i3 < len; i3++) {
      var item2 = list4[i3];
      if (item2) {
        this.toAssignable(item2, arg);
      }
    }
    if (len) {
      var item3 = list4[len - 1];
      if (this.options.ecmaVersion === 6 && arg && item3 && item3.type === "RestElement" && item3.argument.type !== "Identifier") {
        this.unexpected(item3.argument.start);
      }
    }
    return list4;
  };
  prototype4.parseSpread = function (arg) {
    var startNode = this.startNode();
    this.next();
    startNode.argument = this.parseMaybeAssign(false, arg);
    return this.finishNode(startNode, "SpreadElement");
  };
  prototype4.parseRestBinding = function () {
    var startNode = this.startNode();
    this.next();
    if (this.options.ecmaVersion === 6 && this.type !== types$1.name) {
      this.unexpected();
    }
    startNode.argument = this.parseBindingAtom();
    return this.finishNode(startNode, "RestElement");
  };
  prototype4.parseBindingAtom = function () {
    if (this.options.ecmaVersion >= 6) {
      switch (this.type) {
        case types$1.bracketL:
          var startNode = this.startNode();
          this.next();
          startNode.elements = this.parseBindingList(types$1.bracketR, true, true);
          return this.finishNode(startNode, "ArrayPattern");
        case types$1.braceL:
          return this.parseObj(true);
      }
    }
    return this.parseIdent();
  };
  prototype4.parseBindingList = function (arg, arg2, arg3, arg4) {
    var list4 = [],
      flag2 = true;
    while (!this.eat(arg)) {
      if (flag2) {
        flag2 = false;
      } else {
        this.expect(types$1.comma);
      }
      if (arg2 && this.type === types$1.comma) {
        list4.push(null);
      } else if (arg3 && this.afterTrailingComma(arg)) {
        break;
      } else if (this.type === types$1.ellipsis) {
        var restBinding = this.parseRestBinding();
        this.parseBindingListItem(restBinding);
        list4.push(restBinding);
        if (this.type === types$1.comma) {
          this.raiseRecoverable(this.start, "Comma is not permitted after the rest element");
        }
        this.expect(arg);
        break;
      } else {
        list4.push(this.parseAssignableListItem(arg4));
      }
    }
    return list4;
  };
  prototype4.parseAssignableListItem = function (arg) {
    var maybeDefault = this.parseMaybeDefault(this.start, this.startLoc);
    this.parseBindingListItem(maybeDefault);
    return maybeDefault;
  };
  prototype4.parseBindingListItem = function (arg) {
    return arg;
  };
  prototype4.parseMaybeDefault = function (arg, arg2, left) {
    left = left || this.parseBindingAtom();
    if (this.options.ecmaVersion < 6 || !this.eat(types$1.eq)) {
      return left;
    }
    var startNodeAt = this.startNodeAt(arg, arg2);
    startNodeAt.left = left;
    startNodeAt.right = this.parseMaybeAssign();
    return this.finishNode(startNodeAt, "AssignmentPattern");
  };
  prototype4.checkLValSimple = function (expr, arg, list4) {
    if (arg === void 0) arg = num11;
    var flag2 = arg !== num11;
    switch (expr.type) {
      case "Identifier":
        if (this.strict && this.reservedWordsStrictBind.test(expr.name)) {
          this.raiseRecoverable(expr.start, (flag2 ? "Binding " : "Assigning to ") + expr.name + " in strict mode");
        }
        if (flag2) {
          if (arg === num13 && expr.name === "let") {
            this.raiseRecoverable(expr.start, "let is disallowed as a lexically bound name");
          }
          if (list4) {
            if (fn5(list4, expr.name)) {
              this.raiseRecoverable(expr.start, "Argument name clash");
            }
            list4[expr.name] = true;
          }
          if (arg !== num16) {
            this.declareName(expr.name, arg, expr.start);
          }
        }
        break;
      case "ChainExpression":
        this.raiseRecoverable(expr.start, "Optional chaining cannot appear in left-hand side");
        break;
      case "MemberExpression":
        if (flag2) {
          this.raiseRecoverable(expr.start, "Binding member expression");
        }
        break;
      case "ParenthesizedExpression":
        if (flag2) {
          this.raiseRecoverable(expr.start, "Binding parenthesized expression");
        }
        return this.checkLValSimple(expr.expression, arg, list4);
      default:
        this.raise(expr.start, (flag2 ? "Binding" : "Assigning to") + " rvalue");
    }
  };
  prototype4.checkLValPattern = function (options, arg, arg2) {
    if (arg === void 0) arg = num11;
    switch (options.type) {
      case "ObjectPattern":
        for (var i3 = 0, i4 = options.properties; i3 < i4.length; i3 += 1) {
          var item2 = i4[i3];
          this.checkLValInnerPattern(item2, arg, arg2);
        }
        break;
      case "ArrayPattern":
        for (var i5 = 0, i6 = options.elements; i5 < i6.length; i5 += 1) {
          var item3 = i6[i5];
          if (item3) {
            this.checkLValInnerPattern(item3, arg, arg2);
          }
        }
        break;
      default:
        this.checkLValSimple(options, arg, arg2);
    }
  };
  prototype4.checkLValInnerPattern = function (options, arg, arg2) {
    if (arg === void 0) arg = num11;
    switch (options.type) {
      case "Property":
        this.checkLValInnerPattern(options.value, arg, arg2);
        break;
      case "AssignmentPattern":
        this.checkLValPattern(options.left, arg, arg2);
        break;
      case "RestElement":
        this.checkLValPattern(options.argument, arg, arg2);
        break;
      default:
        this.checkLValPattern(options, arg, arg2);
    }
  };
  var TokContext = function fn40(token, flag2, flag3, override, flag4) {
    this.token = token;
    this.isExpr = !!flag2;
    this.preserveSpace = !!flag3;
    this.override = override;
    this.generator = !!flag4;
  };
  var tokContexts = {
    b_stat: new TokContext("{", false),
    b_expr: new TokContext("{", true),
    b_tmpl: new TokContext("${", false),
    p_stat: new TokContext("(", false),
    p_expr: new TokContext("(", true),
    q_tmpl: new TokContext("`", true, true, function (obj13) {
      return obj13.tryReadTemplateToken();
    }),
    f_stat: new TokContext("function", false),
    f_expr: new TokContext("function", true),
    f_expr_gen: new TokContext("function", true, false, null, true),
    f_gen: new TokContext("function", false, false, null, true)
  };
  var prototype5 = Parser.prototype;
  prototype5.initialContext = function () {
    return [tokContexts.b_stat];
  };
  prototype5.curContext = function () {
    return this.context[this.context.length - 1];
  };
  prototype5.braceIsBlock = function (arg) {
    var curContext = this.curContext();
    if (curContext === tokContexts.f_expr || curContext === tokContexts.f_stat) {
      return true;
    }
    if (arg === types$1.colon && (curContext === tokContexts.b_stat || curContext === tokContexts.b_expr)) {
      return !curContext.isExpr;
    }
    if (arg === types$1._return || arg === types$1.name && this.exprAllowed) {
      return lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
    }
    if (arg === types$1._else || arg === types$1.semi || arg === types$1.eof || arg === types$1.parenR || arg === types$1.arrow) {
      return true;
    }
    if (arg === types$1.braceL) {
      return curContext === tokContexts.b_stat;
    }
    if (arg === types$1._var || arg === types$1._const || arg === types$1.name) {
      return false;
    }
    return !this.exprAllowed;
  };
  prototype5.inGeneratorContext = function () {
    for (var i3 = this.context.length - 1; i3 >= 1; i3--) {
      var item2 = this.context[i3];
      if (item2.token === "function") {
        return item2.generator;
      }
    }
    return false;
  };
  prototype5.updateContext = function (arg) {
    var updateContext,
      type = this.type;
    if (type.keyword && arg === types$1.dot) {
      this.exprAllowed = false;
    } else if (updateContext = type.updateContext) {
      updateContext.call(this, arg);
    } else {
      this.exprAllowed = type.beforeExpr;
    }
  };
  prototype5.overrideContext = function (arg) {
    if (this.curContext() !== arg) {
      this.context[this.context.length - 1] = arg;
    }
  };
  types$1.parenR.updateContext = types$1.braceR.updateContext = function () {
    if (this.context.length === 1) {
      this.exprAllowed = true;
      return;
    }
    var item2 = this.context.pop();
    if (item2 === tokContexts.b_stat && this.curContext().token === "function") {
      item2 = this.context.pop();
    }
    this.exprAllowed = !item2.isExpr;
  };
  types$1.braceL.updateContext = function (arg) {
    this.context.push(this.braceIsBlock(arg) ? tokContexts.b_stat : tokContexts.b_expr);
    this.exprAllowed = true;
  };
  types$1.dollarBraceL.updateContext = function () {
    this.context.push(tokContexts.b_tmpl);
    this.exprAllowed = true;
  };
  types$1.parenL.updateContext = function (arg) {
    var flag2 = arg === types$1._if || arg === types$1._for || arg === types$1._with || arg === types$1._while;
    this.context.push(flag2 ? tokContexts.p_stat : tokContexts.p_expr);
    this.exprAllowed = true;
  };
  types$1.incDec.updateContext = function () {};
  types$1._function.updateContext = types$1._class.updateContext = function (obj13) {
    if (obj13.beforeExpr && obj13 !== types$1._else && !(obj13 === types$1.semi && this.curContext() !== tokContexts.p_stat) && !(obj13 === types$1._return && lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) && !((obj13 === types$1.colon || obj13 === types$1.braceL) && this.curContext() === tokContexts.b_stat)) {
      this.context.push(tokContexts.f_expr);
    } else {
      this.context.push(tokContexts.f_stat);
    }
    this.exprAllowed = false;
  };
  types$1.colon.updateContext = function () {
    if (this.curContext().token === "function") {
      this.context.pop();
    }
    this.exprAllowed = true;
  };
  types$1.backQuote.updateContext = function () {
    if (this.curContext() === tokContexts.q_tmpl) {
      this.context.pop();
    } else {
      this.context.push(tokContexts.q_tmpl);
    }
    this.exprAllowed = false;
  };
  types$1.star.updateContext = function (arg) {
    if (arg === types$1._function) {
      var num23 = this.context.length - 1;
      if (this.context[num23] === tokContexts.f_expr) {
        this.context[num23] = tokContexts.f_expr_gen;
      } else {
        this.context[num23] = tokContexts.f_gen;
      }
    }
    this.exprAllowed = true;
  };
  types$1.name.updateContext = function (arg) {
    var exprAllowed = false;
    if (this.options.ecmaVersion >= 6 && arg !== types$1.dot) {
      if (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) {
        exprAllowed = true;
      }
    }
    this.exprAllowed = exprAllowed;
  };
  var prototype6 = Parser.prototype;
  prototype6.checkPropClash = function (options, list4, obj13) {
    if (this.options.ecmaVersion >= 9 && options.type === "SpreadElement") {
      return;
    }
    if (this.options.ecmaVersion >= 6 && (options.computed || options.method || options.shorthand)) {
      return;
    }
    var key = options.key;
    var name;
    switch (key.type) {
      case "Identifier":
        name = key.name;
        break;
      case "Literal":
        name = String(key.value);
        break;
      default:
        return;
    }
    var kind = options.kind;
    if (this.options.ecmaVersion >= 6) {
      if (name === "__proto__" && kind === "init") {
        if (list4.proto) {
          if (obj13) {
            if (obj13.doubleProto < 0) {
              obj13.doubleProto = key.start;
            }
          } else {
            this.raiseRecoverable(key.start, "Redefinition of __proto__ property");
          }
        }
        list4.proto = true;
      }
      return;
    }
    name = "$" + name;
    var item2 = list4[name];
    if (item2) {
      var set;
      if (kind === "init") {
        set = this.strict && item2.init || item2.get || item2.set;
      } else {
        set = item2.init || item2[kind];
      }
      if (set) {
        this.raiseRecoverable(key.start, "Redefinition of property");
      }
    } else {
      item2 = list4[name] = {
        init: false,
        get: false,
        set: false
      };
    }
    item2[kind] = true;
  };
  prototype6.parseExpression = function (arg, arg2) {
    var start = this.start,
      startLoc = this.startLoc;
    var maybeAssign = this.parseMaybeAssign(arg, arg2);
    if (this.type === types$1.comma) {
      var startNodeAt = this.startNodeAt(start, startLoc);
      startNodeAt.expressions = [maybeAssign];
      while (this.eat(types$1.comma)) {
        startNodeAt.expressions.push(this.parseMaybeAssign(arg, arg2));
      }
      return this.finishNode(startNodeAt, "SequenceExpression");
    }
    return maybeAssign;
  };
  prototype6.parseMaybeAssign = function (arg, options, obj13) {
    if (this.isContextual("yield")) {
      if (this.inGenerator) {
        return this.parseYield(arg);
      } else {
        this.exprAllowed = false;
      }
    }
    var flag2 = false,
      parenthesizedAssign = -1,
      trailingComma = -1,
      doubleProto = -1;
    if (options) {
      parenthesizedAssign = options.parenthesizedAssign;
      trailingComma = options.trailingComma;
      doubleProto = options.doubleProto;
      options.parenthesizedAssign = options.trailingComma = -1;
    } else {
      options = new fn12();
      flag2 = true;
    }
    var start = this.start,
      startLoc = this.startLoc;
    if (this.type === types$1.parenL || this.type === types$1.name) {
      this.potentialArrowAt = this.start;
      this.potentialArrowInForAwait = arg === "await";
    }
    var left = this.parseMaybeConditional(arg, options);
    if (obj13) {
      left = obj13.call(this, left, start, startLoc);
    }
    if (this.type.isAssign) {
      var startNodeAt = this.startNodeAt(start, startLoc);
      startNodeAt.operator = this.value;
      if (this.type === types$1.eq) {
        left = this.toAssignable(left, false, options);
      }
      if (!flag2) {
        options.parenthesizedAssign = options.trailingComma = options.doubleProto = -1;
      }
      if (options.shorthandAssign >= left.start) {
        options.shorthandAssign = -1;
      }
      if (this.type === types$1.eq) {
        this.checkLValPattern(left);
      } else {
        this.checkLValSimple(left);
      }
      startNodeAt.left = left;
      this.next();
      startNodeAt.right = this.parseMaybeAssign(arg);
      if (doubleProto > -1) {
        options.doubleProto = doubleProto;
      }
      return this.finishNode(startNodeAt, "AssignmentExpression");
    } else {
      if (flag2) {
        this.checkExpressionErrors(options, true);
      }
    }
    if (parenthesizedAssign > -1) {
      options.parenthesizedAssign = parenthesizedAssign;
    }
    if (trailingComma > -1) {
      options.trailingComma = trailingComma;
    }
    return left;
  };
  prototype6.parseMaybeConditional = function (arg, arg2) {
    var start = this.start,
      startLoc = this.startLoc;
    var test = this.parseExprOps(arg, arg2);
    if (this.checkExpressionErrors(arg2)) {
      return test;
    }
    if (this.eat(types$1.question)) {
      var startNodeAt = this.startNodeAt(start, startLoc);
      startNodeAt.test = test;
      startNodeAt.consequent = this.parseMaybeAssign();
      this.expect(types$1.colon);
      startNodeAt.alternate = this.parseMaybeAssign(arg);
      return this.finishNode(startNodeAt, "ConditionalExpression");
    }
    return test;
  };
  prototype6.parseExprOps = function (arg, arg2) {
    var start = this.start,
      startLoc = this.startLoc;
    var maybeUnary = this.parseMaybeUnary(arg2, false, false, arg);
    if (this.checkExpressionErrors(arg2)) {
      return maybeUnary;
    }
    return maybeUnary.start === start && maybeUnary.type === "ArrowFunctionExpression" ? maybeUnary : this.parseExprOp(maybeUnary, start, startLoc, -1, arg);
  };
  prototype6.parseExprOp = function (arg, arg2, arg3, num23, flag2) {
    var binop = this.type.binop;
    if (binop != null && (!flag2 || this.type !== types$1._in)) {
      if (binop > num23) {
        var flag3 = this.type === types$1.logicalOR || this.type === types$1.logicalAND;
        var flag4 = this.type === types$1.coalesce;
        if (flag4) {
          binop = types$1.logicalAND.binop;
        }
        var value = this.value;
        this.next();
        var start = this.start,
          startLoc = this.startLoc;
        var exprOp = this.parseExprOp(this.parseMaybeUnary(null, false, false, flag2), start, startLoc, binop, flag2);
        var binary = this.buildBinary(arg2, arg3, arg, exprOp, value, flag3 || flag4);
        if (flag3 && this.type === types$1.coalesce || flag4 && (this.type === types$1.logicalOR || this.type === types$1.logicalAND)) {
          this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses");
        }
        return this.parseExprOp(binary, arg2, arg3, num23, flag2);
      }
    }
    return arg;
  };
  prototype6.buildBinary = function (arg, arg2, left, right, operator, arg3) {
    if (right.type === "PrivateIdentifier") {
      this.raise(right.start, "Private identifier can only be left side of binary expression");
    }
    var startNodeAt = this.startNodeAt(arg, arg2);
    startNodeAt.left = left;
    startNodeAt.operator = operator;
    startNodeAt.right = right;
    return this.finishNode(startNodeAt, arg3 ? "LogicalExpression" : "BinaryExpression");
  };
  prototype6.parseMaybeUnary = function (arg, flag2, flag3, arg2) {
    var start = this.start,
      startLoc = this.startLoc,
      argument;
    if (this.isContextual("await") && this.canAwait) {
      argument = this.parseAwait(arg2);
      flag2 = true;
    } else if (this.type.prefix) {
      var startNode = this.startNode(),
        flag4 = this.type === types$1.incDec;
      startNode.operator = this.value;
      startNode.prefix = true;
      this.next();
      startNode.argument = this.parseMaybeUnary(null, true, flag4, arg2);
      this.checkExpressionErrors(arg, true);
      if (flag4) {
        this.checkLValSimple(startNode.argument);
      } else if (this.strict && startNode.operator === "delete" && fn15(startNode.argument)) {
        this.raiseRecoverable(startNode.start, "Deleting local variable in strict mode");
      } else if (startNode.operator === "delete" && fn16(startNode.argument)) {
        this.raiseRecoverable(startNode.start, "Private fields can not be deleted");
      } else {
        flag2 = true;
      }
      argument = this.finishNode(startNode, flag4 ? "UpdateExpression" : "UnaryExpression");
    } else if (!flag2 && this.type === types$1.privateId) {
      if ((arg2 || this.privateNameStack.length === 0) && this.options.checkPrivateFields) {
        this.unexpected();
      }
      argument = this.parsePrivateIdent();
      if (this.type !== types$1._in) {
        this.unexpected();
      }
    } else {
      argument = this.parseExprSubscripts(arg, arg2);
      if (this.checkExpressionErrors(arg)) {
        return argument;
      }
      while (this.type.postfix && !this.canInsertSemicolon()) {
        var startNodeAt = this.startNodeAt(start, startLoc);
        startNodeAt.operator = this.value;
        startNodeAt.prefix = false;
        startNodeAt.argument = argument;
        this.checkLValSimple(argument);
        this.next();
        argument = this.finishNode(startNodeAt, "UpdateExpression");
      }
    }
    if (!flag3 && this.eat(types$1.starstar)) {
      if (flag2) {
        this.unexpected(this.lastTokStart);
      } else {
        return this.buildBinary(start, startLoc, argument, this.parseMaybeUnary(null, false, false, arg2), "**", false);
      }
    } else {
      return argument;
    }
  };
  function fn15(obj13) {
    return obj13.type === "Identifier" || obj13.type === "ParenthesizedExpression" && fn15(obj13.expression);
  }
  function fn16(options) {
    return options.type === "MemberExpression" && options.property.type === "PrivateIdentifier" || options.type === "ChainExpression" && fn16(options.expression) || options.type === "ParenthesizedExpression" && fn16(options.expression);
  }
  prototype6.parseExprSubscripts = function (options, arg) {
    var start = this.start,
      startLoc = this.startLoc;
    var exprAtom = this.parseExprAtom(options, arg);
    if (exprAtom.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")") {
      return exprAtom;
    }
    var subscripts = this.parseSubscripts(exprAtom, start, startLoc, false, arg);
    if (options && subscripts.type === "MemberExpression") {
      if (options.parenthesizedAssign >= subscripts.start) {
        options.parenthesizedAssign = -1;
      }
      if (options.parenthesizedBind >= subscripts.start) {
        options.parenthesizedBind = -1;
      }
      if (options.trailingComma >= subscripts.start) {
        options.trailingComma = -1;
      }
    }
    return subscripts;
  };
  prototype6.parseSubscripts = function (base, arg, arg2, arg3, arg4) {
    var flag2 = this.options.ecmaVersion >= 8 && base.type === "Identifier" && base.name === "async" && this.lastTokEnd === base.end && !this.canInsertSemicolon() && base.end - base.start === 5 && this.potentialArrowAt === base.start;
    var flag3 = false;
    while (true) {
      var expression = this.parseSubscript(base, arg, arg2, arg3, flag2, flag3, arg4);
      if (expression.optional) {
        flag3 = true;
      }
      if (expression === base || expression.type === "ArrowFunctionExpression") {
        if (flag3) {
          var startNodeAt = this.startNodeAt(arg, arg2);
          startNodeAt.expression = expression;
          expression = this.finishNode(startNodeAt, "ChainExpression");
        }
        return expression;
      }
      base = expression;
    }
  };
  prototype6.shouldParseAsyncArrow = function () {
    return !this.canInsertSemicolon() && this.eat(types$1.arrow);
  };
  prototype6.parseSubscriptAsyncArrow = function (arg, arg2, arg3, arg4) {
    return this.parseArrowExpression(this.startNodeAt(arg, arg2), arg3, true, arg4);
  };
  prototype6.parseSubscript = function (object, arg, arg2, flag2, arg3, arg4, arg5) {
    var flag3 = this.options.ecmaVersion >= 11;
    var optional = flag3 && this.eat(types$1.questionDot);
    if (flag2 && optional) {
      this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
    }
    var eat = this.eat(types$1.bracketL);
    if (eat || optional && this.type !== types$1.parenL && this.type !== types$1.backQuote || this.eat(types$1.dot)) {
      var startNodeAt = this.startNodeAt(arg, arg2);
      startNodeAt.object = object;
      if (eat) {
        startNodeAt.property = this.parseExpression();
        this.expect(types$1.bracketR);
      } else if (this.type === types$1.privateId && object.type !== "Super") {
        startNodeAt.property = this.parsePrivateIdent();
      } else {
        startNodeAt.property = this.parseIdent(this.options.allowReserved !== "never");
      }
      startNodeAt.computed = !!eat;
      if (flag3) {
        startNodeAt.optional = optional;
      }
      object = this.finishNode(startNodeAt, "MemberExpression");
    } else if (!flag2 && this.eat(types$1.parenL)) {
      var fn122 = new fn12(),
        yieldPos = this.yieldPos,
        awaitPos = this.awaitPos,
        awaitIdentPos = this.awaitIdentPos;
      this.yieldPos = 0;
      this.awaitPos = 0;
      this.awaitIdentPos = 0;
      var exprList = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, false, fn122);
      if (arg3 && !optional && this.shouldParseAsyncArrow()) {
        this.checkPatternErrors(fn122, false);
        this.checkYieldAwaitInDefaultParams();
        if (this.awaitIdentPos > 0) {
          this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function");
        }
        this.yieldPos = yieldPos;
        this.awaitPos = awaitPos;
        this.awaitIdentPos = awaitIdentPos;
        return this.parseSubscriptAsyncArrow(arg, arg2, exprList, arg5);
      }
      this.checkExpressionErrors(fn122, true);
      this.yieldPos = yieldPos || this.yieldPos;
      this.awaitPos = awaitPos || this.awaitPos;
      this.awaitIdentPos = awaitIdentPos || this.awaitIdentPos;
      var startNodeAt2 = this.startNodeAt(arg, arg2);
      startNodeAt2.callee = object;
      startNodeAt2.arguments = exprList;
      if (flag3) {
        startNodeAt2.optional = optional;
      }
      object = this.finishNode(startNodeAt2, "CallExpression");
    } else if (this.type === types$1.backQuote) {
      if (optional || arg4) {
        this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
      }
      var startNodeAt3 = this.startNodeAt(arg, arg2);
      startNodeAt3.tag = object;
      startNodeAt3.quasi = this.parseTemplate({
        isTagged: true
      });
      object = this.finishNode(startNodeAt3, "TaggedTemplateExpression");
    }
    return object;
  };
  prototype6.parseExprAtom = function (obj13, arg, arg2) {
    if (this.type === types$1.slash) {
      this.readRegexp();
    }
    var startNode,
      flag2 = this.potentialArrowAt === this.start;
    switch (this.type) {
      case types$1._super:
        if (!this.allowSuper) {
          this.raise(this.start, "'super' keyword outside a method");
        }
        startNode = this.startNode();
        this.next();
        if (this.type === types$1.parenL && !this.allowDirectSuper) {
          this.raise(startNode.start, "super() call outside constructor of a subclass");
        }
        if (this.type !== types$1.dot && this.type !== types$1.bracketL && this.type !== types$1.parenL) {
          this.unexpected();
        }
        return this.finishNode(startNode, "Super");
      case types$1._this:
        startNode = this.startNode();
        this.next();
        return this.finishNode(startNode, "ThisExpression");
      case types$1.name:
        var start = this.start,
          startLoc = this.startLoc,
          containsEsc = this.containsEsc;
        var id = this.parseIdent(false);
        if (this.options.ecmaVersion >= 8 && !containsEsc && id.name === "async" && !this.canInsertSemicolon() && this.eat(types$1._function)) {
          this.overrideContext(tokContexts.f_expr);
          return this.parseFunction(this.startNodeAt(start, startLoc), 0, false, true, arg);
        }
        if (flag2 && !this.canInsertSemicolon()) {
          if (this.eat(types$1.arrow)) {
            return this.parseArrowExpression(this.startNodeAt(start, startLoc), [id], false, arg);
          }
          if (this.options.ecmaVersion >= 8 && id.name === "async" && this.type === types$1.name && !containsEsc && (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc)) {
            id = this.parseIdent(false);
            if (this.canInsertSemicolon() || !this.eat(types$1.arrow)) {
              this.unexpected();
            }
            return this.parseArrowExpression(this.startNodeAt(start, startLoc), [id], true, arg);
          }
        }
        return id;
      case types$1.regexp:
        var value = this.value;
        startNode = this.parseLiteral(value.value);
        startNode.regex = {
          pattern: value.pattern,
          flags: value.flags
        };
        return startNode;
      case types$1.num:
      case types$1.string:
        return this.parseLiteral(this.value);
      case types$1._null:
      case types$1._true:
      case types$1._false:
        startNode = this.startNode();
        startNode.value = this.type === types$1._null ? null : this.type === types$1._true;
        startNode.raw = this.type.keyword;
        this.next();
        return this.finishNode(startNode, "Literal");
      case types$1.parenL:
        var parenthesizedAssign = this.start,
          parenAndDistinguishExpression = this.parseParenAndDistinguishExpression(flag2, arg);
        if (obj13) {
          if (obj13.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(parenAndDistinguishExpression)) {
            obj13.parenthesizedAssign = parenthesizedAssign;
          }
          if (obj13.parenthesizedBind < 0) {
            obj13.parenthesizedBind = parenthesizedAssign;
          }
        }
        return parenAndDistinguishExpression;
      case types$1.bracketL:
        startNode = this.startNode();
        this.next();
        startNode.elements = this.parseExprList(types$1.bracketR, true, true, obj13);
        return this.finishNode(startNode, "ArrayExpression");
      case types$1.braceL:
        this.overrideContext(tokContexts.b_expr);
        return this.parseObj(false, obj13);
      case types$1._function:
        startNode = this.startNode();
        this.next();
        return this.parseFunction(startNode, 0);
      case types$1._class:
        return this.parseClass(this.startNode(), false);
      case types$1._new:
        return this.parseNew();
      case types$1.backQuote:
        return this.parseTemplate();
      case types$1._import:
        if (this.options.ecmaVersion >= 11) {
          return this.parseExprImport(arg2);
        } else {
          return this.unexpected();
        }
      default:
        return this.parseExprAtomDefault();
    }
  };
  prototype6.parseExprAtomDefault = function () {
    this.unexpected();
  };
  prototype6.parseExprImport = function (flag2) {
    var startNode = this.startNode();
    if (this.containsEsc) {
      this.raiseRecoverable(this.start, "Escape sequence in keyword import");
    }
    this.next();
    if (this.type === types$1.parenL && !flag2) {
      return this.parseDynamicImport(startNode);
    } else if (this.type === types$1.dot) {
      var meta = this.startNodeAt(startNode.start, startNode.loc && startNode.loc.start);
      meta.name = "import";
      startNode.meta = this.finishNode(meta, "Identifier");
      return this.parseImportMeta(startNode);
    } else {
      this.unexpected();
    }
  };
  prototype6.parseDynamicImport = function (obj13) {
    this.next();
    obj13.source = this.parseMaybeAssign();
    if (!this.eat(types$1.parenR)) {
      var start = this.start;
      if (this.eat(types$1.comma) && this.eat(types$1.parenR)) {
        this.raiseRecoverable(start, "Trailing comma is not allowed in import()");
      } else {
        this.unexpected(start);
      }
    }
    return this.finishNode(obj13, "ImportExpression");
  };
  prototype6.parseImportMeta = function (obj13) {
    this.next();
    var containsEsc = this.containsEsc;
    obj13.property = this.parseIdent(true);
    if (obj13.property.name !== "meta") {
      this.raiseRecoverable(obj13.property.start, "The only valid meta property for import is 'import.meta'");
    }
    if (containsEsc) {
      this.raiseRecoverable(obj13.start, "'import.meta' must not contain escaped characters");
    }
    if (this.options.sourceType !== "module" && !this.options.allowImportExportEverywhere) {
      this.raiseRecoverable(obj13.start, "Cannot use 'import.meta' outside a module");
    }
    return this.finishNode(obj13, "MetaProperty");
  };
  prototype6.parseLiteral = function (value) {
    var startNode = this.startNode();
    startNode.value = value;
    startNode.raw = this.input.slice(this.start, this.end);
    if (startNode.raw.charCodeAt(startNode.raw.length - 1) === 110) {
      startNode.bigint = startNode.raw.slice(0, -1).replace(/_/g, "");
    }
    this.next();
    return this.finishNode(startNode, "Literal");
  };
  prototype6.parseParenExpression = function () {
    this.expect(types$1.parenL);
    var expression = this.parseExpression();
    this.expect(types$1.parenR);
    return expression;
  };
  prototype6.shouldParseArrow = function (arg) {
    return !this.canInsertSemicolon();
  };
  prototype6.parseParenAndDistinguishExpression = function (arg, arg2) {
    var start = this.start,
      startLoc = this.startLoc,
      expression,
      flag2 = this.options.ecmaVersion >= 8;
    if (this.options.ecmaVersion >= 6) {
      this.next();
      var start2 = this.start,
        startLoc2 = this.startLoc;
      var expressions = [],
        flag3 = true,
        flag4 = false;
      var fn122 = new fn12(),
        yieldPos = this.yieldPos,
        awaitPos = this.awaitPos,
        start3;
      this.yieldPos = 0;
      this.awaitPos = 0;
      while (this.type !== types$1.parenR) {
        flag3 ? flag3 = false : this.expect(types$1.comma);
        if (flag2 && this.afterTrailingComma(types$1.parenR, true)) {
          flag4 = true;
          break;
        } else if (this.type === types$1.ellipsis) {
          start3 = this.start;
          expressions.push(this.parseParenItem(this.parseRestBinding()));
          if (this.type === types$1.comma) {
            this.raiseRecoverable(this.start, "Comma is not permitted after the rest element");
          }
          break;
        } else {
          expressions.push(this.parseMaybeAssign(false, fn122, this.parseParenItem));
        }
      }
      var lastTokEnd = this.lastTokEnd,
        lastTokEndLoc = this.lastTokEndLoc;
      this.expect(types$1.parenR);
      if (arg && this.shouldParseArrow(expressions) && this.eat(types$1.arrow)) {
        this.checkPatternErrors(fn122, false);
        this.checkYieldAwaitInDefaultParams();
        this.yieldPos = yieldPos;
        this.awaitPos = awaitPos;
        return this.parseParenArrowList(start, startLoc, expressions, arg2);
      }
      if (!expressions.length || flag4) {
        this.unexpected(this.lastTokStart);
      }
      if (start3) {
        this.unexpected(start3);
      }
      this.checkExpressionErrors(fn122, true);
      this.yieldPos = yieldPos || this.yieldPos;
      this.awaitPos = awaitPos || this.awaitPos;
      if (expressions.length > 1) {
        expression = this.startNodeAt(start2, startLoc2);
        expression.expressions = expressions;
        this.finishNodeAt(expression, "SequenceExpression", lastTokEnd, lastTokEndLoc);
      } else {
        expression = expressions[0];
      }
    } else {
      expression = this.parseParenExpression();
    }
    if (this.options.preserveParens) {
      var startNodeAt = this.startNodeAt(start, startLoc);
      startNodeAt.expression = expression;
      return this.finishNode(startNodeAt, "ParenthesizedExpression");
    } else {
      return expression;
    }
  };
  prototype6.parseParenItem = function (arg) {
    return arg;
  };
  prototype6.parseParenArrowList = function (arg, arg2, arg3, arg4) {
    return this.parseArrowExpression(this.startNodeAt(arg, arg2), arg3, false, arg4);
  };
  var list3 = [];
  prototype6.parseNew = function () {
    if (this.containsEsc) {
      this.raiseRecoverable(this.start, "Escape sequence in keyword new");
    }
    var startNode = this.startNode();
    this.next();
    if (this.options.ecmaVersion >= 6 && this.type === types$1.dot) {
      var meta = this.startNodeAt(startNode.start, startNode.loc && startNode.loc.start);
      meta.name = "new";
      startNode.meta = this.finishNode(meta, "Identifier");
      this.next();
      var containsEsc = this.containsEsc;
      startNode.property = this.parseIdent(true);
      if (startNode.property.name !== "target") {
        this.raiseRecoverable(startNode.property.start, "The only valid meta property for new is 'new.target'");
      }
      if (containsEsc) {
        this.raiseRecoverable(startNode.start, "'new.target' must not contain escaped characters");
      }
      if (!this.allowNewDotTarget) {
        this.raiseRecoverable(startNode.start, "'new.target' can only be used in functions and class static block");
      }
      return this.finishNode(startNode, "MetaProperty");
    }
    var start = this.start,
      startLoc = this.startLoc;
    startNode.callee = this.parseSubscripts(this.parseExprAtom(null, false, true), start, startLoc, true, false);
    if (this.eat(types$1.parenL)) {
      startNode.arguments = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, false);
    } else {
      startNode.arguments = list3;
    }
    return this.finishNode(startNode, "NewExpression");
  };
  prototype6.parseTemplateElement = function (obj13) {
    var isTagged = obj13.isTagged;
    var startNode = this.startNode();
    if (this.type === types$1.invalidTemplate) {
      if (!isTagged) {
        this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal");
      }
      startNode.value = {
        raw: this.value.replace(/\r\n?/g, "\n"),
        cooked: null
      };
    } else {
      startNode.value = {
        raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
        cooked: this.value
      };
    }
    this.next();
    startNode.tail = this.type === types$1.backQuote;
    return this.finishNode(startNode, "TemplateElement");
  };
  prototype6.parseTemplate = function (obj13) {
    if (obj13 === void 0) obj13 = {};
    var isTagged = obj13.isTagged;
    if (isTagged === void 0) isTagged = false;
    var startNode = this.startNode();
    this.next();
    startNode.expressions = [];
    var templateElement = this.parseTemplateElement({
      isTagged
    });
    startNode.quasis = [templateElement];
    while (!templateElement.tail) {
      if (this.type === types$1.eof) {
        this.raise(this.pos, "Unterminated template literal");
      }
      this.expect(types$1.dollarBraceL);
      startNode.expressions.push(this.parseExpression());
      this.expect(types$1.braceR);
      startNode.quasis.push(templateElement = this.parseTemplateElement({
        isTagged
      }));
    }
    this.next();
    return this.finishNode(startNode, "TemplateLiteral");
  };
  prototype6.isAsyncProp = function (obj13) {
    return !obj13.computed && obj13.key.type === "Identifier" && obj13.key.name === "async" && (this.type === types$1.name || this.type === types$1.num || this.type === types$1.string || this.type === types$1.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === types$1.star) && !lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
  };
  prototype6.parseObj = function (flag2, arg) {
    var startNode = this.startNode(),
      flag3 = true,
      obj13 = {};
    startNode.properties = [];
    this.next();
    while (!this.eat(types$1.braceR)) {
      if (!flag3) {
        this.expect(types$1.comma);
        if (this.options.ecmaVersion >= 5 && this.afterTrailingComma(types$1.braceR)) {
          break;
        }
      } else {
        flag3 = false;
      }
      var property = this.parseProperty(flag2, arg);
      if (!flag2) {
        this.checkPropClash(property, obj13, arg);
      }
      startNode.properties.push(property);
    }
    return this.finishNode(startNode, flag2 ? "ObjectPattern" : "ObjectExpression");
  };
  prototype6.parseProperty = function (flag2, obj13) {
    var startNode = this.startNode(),
      eat,
      flag3,
      start,
      startLoc;
    if (this.options.ecmaVersion >= 9 && this.eat(types$1.ellipsis)) {
      if (flag2) {
        startNode.argument = this.parseIdent(false);
        if (this.type === types$1.comma) {
          this.raiseRecoverable(this.start, "Comma is not permitted after the rest element");
        }
        return this.finishNode(startNode, "RestElement");
      }
      startNode.argument = this.parseMaybeAssign(false, obj13);
      if (this.type === types$1.comma && obj13 && obj13.trailingComma < 0) {
        obj13.trailingComma = this.start;
      }
      return this.finishNode(startNode, "SpreadElement");
    }
    if (this.options.ecmaVersion >= 6) {
      startNode.method = false;
      startNode.shorthand = false;
      if (flag2 || obj13) {
        start = this.start;
        startLoc = this.startLoc;
      }
      if (!flag2) {
        eat = this.eat(types$1.star);
      }
    }
    var containsEsc = this.containsEsc;
    this.parsePropertyName(startNode);
    if (!flag2 && !containsEsc && this.options.ecmaVersion >= 8 && !eat && this.isAsyncProp(startNode)) {
      flag3 = true;
      eat = this.options.ecmaVersion >= 9 && this.eat(types$1.star);
      this.parsePropertyName(startNode);
    } else {
      flag3 = false;
    }
    this.parsePropertyValue(startNode, flag2, eat, flag3, start, startLoc, obj13, containsEsc);
    return this.finishNode(startNode, "Property");
  };
  prototype6.parseGetterSetter = function (options) {
    options.kind = options.key.name;
    this.parsePropertyName(options);
    options.value = this.parseMethod(false);
    var num23 = options.kind === "get" ? 0 : 1;
    if (options.value.params.length !== num23) {
      var start = options.value.start;
      if (options.kind === "get") {
        this.raiseRecoverable(start, "getter should have no params");
      } else {
        this.raiseRecoverable(start, "setter should have exactly one param");
      }
    } else {
      if (options.kind === "set" && options.value.params[0].type === "RestElement") {
        this.raiseRecoverable(options.value.params[0].start, "Setter cannot use rest params");
      }
    }
  };
  prototype6.parsePropertyValue = function (options, flag2, arg, arg2, awaitIdentPos, arg3, obj13, flag3) {
    if ((arg || arg2) && this.type === types$1.colon) {
      this.unexpected();
    }
    if (this.eat(types$1.colon)) {
      options.value = flag2 ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, obj13);
      options.kind = "init";
    } else if (this.options.ecmaVersion >= 6 && this.type === types$1.parenL) {
      if (flag2) {
        this.unexpected();
      }
      options.kind = "init";
      options.method = true;
      options.value = this.parseMethod(arg, arg2);
    } else if (!flag2 && !flag3 && this.options.ecmaVersion >= 5 && !options.computed && options.key.type === "Identifier" && (options.key.name === "get" || options.key.name === "set") && this.type !== types$1.comma && this.type !== types$1.braceR && this.type !== types$1.eq) {
      if (arg || arg2) {
        this.unexpected();
      }
      this.parseGetterSetter(options);
    } else if (this.options.ecmaVersion >= 6 && !options.computed && options.key.type === "Identifier") {
      if (arg || arg2) {
        this.unexpected();
      }
      this.checkUnreserved(options.key);
      if (options.key.name === "await" && !this.awaitIdentPos) {
        this.awaitIdentPos = awaitIdentPos;
      }
      options.kind = "init";
      if (flag2) {
        options.value = this.parseMaybeDefault(awaitIdentPos, arg3, this.copyNode(options.key));
      } else if (this.type === types$1.eq && obj13) {
        if (obj13.shorthandAssign < 0) {
          obj13.shorthandAssign = this.start;
        }
        options.value = this.parseMaybeDefault(awaitIdentPos, arg3, this.copyNode(options.key));
      } else {
        options.value = this.copyNode(options.key);
      }
      options.shorthand = true;
    } else {
      this.unexpected();
    }
  };
  prototype6.parsePropertyName = function (obj13) {
    if (this.options.ecmaVersion >= 6) {
      if (this.eat(types$1.bracketL)) {
        obj13.computed = true;
        obj13.key = this.parseMaybeAssign();
        this.expect(types$1.bracketR);
        return obj13.key;
      } else {
        obj13.computed = false;
      }
    }
    return obj13.key = this.type === types$1.num || this.type === types$1.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
  };
  prototype6.initFunction = function (options) {
    options.id = null;
    if (this.options.ecmaVersion >= 6) {
      options.generator = options.expression = false;
    }
    if (this.options.ecmaVersion >= 8) {
      options.async = false;
    }
  };
  prototype6.parseMethod = function (generator, flag2, arg) {
    var startNode = this.startNode(),
      yieldPos = this.yieldPos,
      awaitPos = this.awaitPos,
      awaitIdentPos = this.awaitIdentPos;
    this.initFunction(startNode);
    if (this.options.ecmaVersion >= 6) {
      startNode.generator = generator;
    }
    if (this.options.ecmaVersion >= 8) {
      startNode.async = !!flag2;
    }
    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;
    this.enterScope(fn11(flag2, startNode.generator) | num7 | (arg ? num8 : 0));
    this.expect(types$1.parenL);
    startNode.params = this.parseBindingList(types$1.parenR, false, this.options.ecmaVersion >= 8);
    this.checkYieldAwaitInDefaultParams();
    this.parseFunctionBody(startNode, false, true, false);
    this.yieldPos = yieldPos;
    this.awaitPos = awaitPos;
    this.awaitIdentPos = awaitIdentPos;
    return this.finishNode(startNode, "FunctionExpression");
  };
  prototype6.parseArrowExpression = function (obj13, arg, flag2, arg2) {
    var yieldPos = this.yieldPos,
      awaitPos = this.awaitPos,
      awaitIdentPos = this.awaitIdentPos;
    this.enterScope(fn11(flag2, false) | num5);
    this.initFunction(obj13);
    if (this.options.ecmaVersion >= 8) {
      obj13.async = !!flag2;
    }
    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;
    obj13.params = this.toAssignableList(arg, true);
    this.parseFunctionBody(obj13, true, false, arg2);
    this.yieldPos = yieldPos;
    this.awaitPos = awaitPos;
    this.awaitIdentPos = awaitIdentPos;
    return this.finishNode(obj13, "ArrowFunctionExpression");
  };
  prototype6.parseFunctionBody = function (options, flag2, flag3, arg) {
    var flag4 = flag2 && this.type !== types$1.braceL;
    var strict = this.strict,
      flag5 = false;
    if (flag4) {
      options.body = this.parseMaybeAssign(arg);
      options.expression = true;
      this.checkParams(options, false);
    } else {
      var flag6 = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(options.params);
      if (!strict || flag6) {
        flag5 = this.strictDirective(this.end);
        if (flag5 && flag6) {
          this.raiseRecoverable(options.start, "Illegal 'use strict' directive in function with non-simple parameter list");
        }
      }
      var labels = this.labels;
      this.labels = [];
      if (flag5) {
        this.strict = true;
      }
      this.checkParams(options, !strict && !flag5 && !flag2 && !flag3 && this.isSimpleParamList(options.params));
      if (this.strict && options.id) {
        this.checkLValSimple(options.id, num16);
      }
      options.body = this.parseBlock(false, undefined, flag5 && !strict);
      options.expression = false;
      this.adaptDirectivePrologue(options.body.body);
      this.labels = labels;
    }
    this.exitScope();
  };
  prototype6.isSimpleParamList = function (arg) {
    for (var i3 = 0, i4 = arg; i3 < i4.length; i3 += 1) {
      var item2 = i4[i3];
      if (item2.type !== "Identifier") {
        return false;
      }
    }
    return true;
  };
  prototype6.checkParams = function (obj13, arg) {
    var create2 = Object.create(null);
    for (var i3 = 0, i4 = obj13.params; i3 < i4.length; i3 += 1) {
      var item2 = i4[i3];
      this.checkLValInnerPattern(item2, num12, arg ? null : create2);
    }
  };
  prototype6.parseExprList = function (arg, arg2, arg3, obj13) {
    var list4 = [],
      flag2 = true;
    while (!this.eat(arg)) {
      if (!flag2) {
        this.expect(types$1.comma);
        if (arg2 && this.afterTrailingComma(arg)) {
          break;
        }
      } else {
        flag2 = false;
      }
      var value = void 0;
      if (arg3 && this.type === types$1.comma) {
        value = null;
      } else if (this.type === types$1.ellipsis) {
        value = this.parseSpread(obj13);
        if (obj13 && this.type === types$1.comma && obj13.trailingComma < 0) {
          obj13.trailingComma = this.start;
        }
      } else {
        value = this.parseMaybeAssign(false, obj13);
      }
      list4.push(value);
    }
    return list4;
  };
  prototype6.checkUnreserved = function (ref) {
    var start = ref.start;
    var end = ref.end;
    var name = ref.name;
    if (this.inGenerator && name === "yield") {
      this.raiseRecoverable(start, "Cannot use 'yield' as identifier inside a generator");
    }
    if (this.inAsync && name === "await") {
      this.raiseRecoverable(start, "Cannot use 'await' as identifier inside an async function");
    }
    if (this.currentThisScope().inClassFieldInit && name === "arguments") {
      this.raiseRecoverable(start, "Cannot use 'arguments' in class field initializer");
    }
    if (this.inClassStaticBlock && (name === "arguments" || name === "await")) {
      this.raise(start, "Cannot use " + name + " in class static initialization block");
    }
    if (this.keywords.test(name)) {
      this.raise(start, "Unexpected keyword '" + name + "'");
    }
    if (this.options.ecmaVersion < 6 && this.input.slice(start, end).indexOf("\\") !== -1) {
      return;
    }
    var reservedWordsStrict = this.strict ? this.reservedWordsStrict : this.reservedWords;
    if (reservedWordsStrict.test(name)) {
      if (!this.inAsync && name === "await") {
        this.raiseRecoverable(start, "Cannot use keyword 'await' outside an async function");
      }
      this.raiseRecoverable(start, "The keyword '" + name + "' is reserved");
    }
  };
  prototype6.parseIdent = function (flag2) {
    var node = this.parseIdentNode();
    this.next(!!flag2);
    this.finishNode(node, "Identifier");
    if (!flag2) {
      this.checkUnreserved(node);
      if (node.name === "await" && !this.awaitIdentPos) {
        this.awaitIdentPos = node.start;
      }
    }
    return node;
  };
  prototype6.parseIdentNode = function () {
    var node = this.startNode();
    if (this.type === types$1.name) {
      node.name = this.value;
    } else if (this.type.keyword) {
      node.name = this.type.keyword;
      if ((node.name === "class" || node.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46)) {
        this.context.pop();
      }
      this.type = types$1.name;
    } else {
      this.unexpected();
    }
    return node;
  };
  prototype6.parsePrivateIdent = function () {
    var node = this.startNode();
    if (this.type === types$1.privateId) {
      node.name = this.value;
    } else {
      this.unexpected();
    }
    this.next();
    this.finishNode(node, "PrivateIdentifier");
    if (this.options.checkPrivateFields) {
      if (this.privateNameStack.length === 0) {
        this.raise(node.start, "Private field '#" + node.name + "' must be declared in an enclosing class");
      } else {
        this.privateNameStack[this.privateNameStack.length - 1].used.push(node);
      }
    }
    return node;
  };
  prototype6.parseYield = function (arg) {
    if (!this.yieldPos) {
      this.yieldPos = this.start;
    }
    var startNode = this.startNode();
    this.next();
    if (this.type === types$1.semi || this.canInsertSemicolon() || this.type !== types$1.star && !this.type.startsExpr) {
      startNode.delegate = false;
      startNode.argument = null;
    } else {
      startNode.delegate = this.eat(types$1.star);
      startNode.argument = this.parseMaybeAssign(arg);
    }
    return this.finishNode(startNode, "YieldExpression");
  };
  prototype6.parseAwait = function (arg) {
    if (!this.awaitPos) {
      this.awaitPos = this.start;
    }
    var startNode = this.startNode();
    this.next();
    startNode.argument = this.parseMaybeUnary(null, true, false, arg);
    return this.finishNode(startNode, "AwaitExpression");
  };
  var prototype7 = Parser.prototype;
  prototype7.raise = function (pos, arg) {
    var loc = getLineInfo(this.input, pos);
    arg += " (" + loc.line + ":" + loc.column + ")";
    var syntaxError = new SyntaxError(arg);
    syntaxError.pos = pos;
    syntaxError.loc = loc;
    syntaxError.raisedAt = this.pos;
    throw syntaxError;
  };
  prototype7.raiseRecoverable = prototype7.raise;
  prototype7.curPosition = function () {
    if (this.options.locations) {
      return new Position(this.curLine, this.pos - this.lineStart);
    }
  };
  var prototype8 = Parser.prototype;
  var fn17 = function fn40(flags) {
    this.flags = flags;
    this.var = [];
    this.lexical = [];
    this.functions = [];
    this.inClassFieldInit = false;
  };
  prototype8.enterScope = function (arg) {
    this.scopeStack.push(new fn17(arg));
  };
  prototype8.exitScope = function () {
    this.scopeStack.pop();
  };
  prototype8.treatFunctionsAsVarInScope = function (obj13) {
    return obj13.flags & num2 || !this.inModule && obj13.flags & num;
  };
  prototype8.declareName = function (index, arg, arg2) {
    var flag2 = false;
    if (arg === num13) {
      var currentScope = this.currentScope();
      flag2 = currentScope.lexical.indexOf(index) > -1 || currentScope.functions.indexOf(index) > -1 || currentScope.var.indexOf(index) > -1;
      currentScope.lexical.push(index);
      if (this.inModule && currentScope.flags & num) {
        delete this.undefinedExports[index];
      }
    } else if (arg === num15) {
      var currentScope2 = this.currentScope();
      currentScope2.lexical.push(index);
    } else if (arg === num14) {
      var currentScope3 = this.currentScope();
      if (this.treatFunctionsAsVar) {
        flag2 = currentScope3.lexical.indexOf(index) > -1;
      } else {
        flag2 = currentScope3.lexical.indexOf(index) > -1 || currentScope3.var.indexOf(index) > -1;
      }
      currentScope3.functions.push(index);
    } else {
      for (var i3 = this.scopeStack.length - 1; i3 >= 0; --i3) {
        var item2 = this.scopeStack[i3];
        if (item2.lexical.indexOf(index) > -1 && !(item2.flags & num6 && item2.lexical[0] === index) || !this.treatFunctionsAsVarInScope(item2) && item2.functions.indexOf(index) > -1) {
          flag2 = true;
          break;
        }
        item2.var.push(index);
        if (this.inModule && item2.flags & num) {
          delete this.undefinedExports[index];
        }
        if (item2.flags & num10) {
          break;
        }
      }
    }
    if (flag2) {
      this.raiseRecoverable(arg2, "Identifier '" + index + "' has already been declared");
    }
  };
  prototype8.checkLocalExport = function (id) {
    if (this.scopeStack[0].lexical.indexOf(id.name) === -1 && this.scopeStack[0].var.indexOf(id.name) === -1) {
      this.undefinedExports[id.name] = id;
    }
  };
  prototype8.currentScope = function () {
    return this.scopeStack[this.scopeStack.length - 1];
  };
  prototype8.currentVarScope = function () {
    for (var i3 = this.scopeStack.length - 1;; i3--) {
      var item2 = this.scopeStack[i3];
      if (item2.flags & num10) {
        return item2;
      }
    }
  };
  prototype8.currentThisScope = function () {
    for (var i3 = this.scopeStack.length - 1;; i3--) {
      var item2 = this.scopeStack[i3];
      if (item2.flags & num10 && !(item2.flags & num5)) {
        return item2;
      }
    }
  };
  var Node = function fn40(obj13, start, arg) {
    this.type = "";
    this.start = start;
    this.end = 0;
    if (obj13.options.locations) {
      this.loc = new SourceLocation(obj13, arg);
    }
    if (obj13.options.directSourceFile) {
      this.sourceFile = obj13.options.directSourceFile;
    }
    if (obj13.options.ranges) {
      this.range = [start, 0];
    }
  };
  var prototype9 = Parser.prototype;
  prototype9.startNode = function () {
    return new Node(this, this.start, this.startLoc);
  };
  prototype9.startNodeAt = function (arg, arg2) {
    return new Node(this, arg, arg2);
  };
  function fn18(options, type, end, end2) {
    options.type = type;
    options.end = end;
    if (this.options.locations) {
      options.loc.end = end2;
    }
    if (this.options.ranges) {
      options.range[1] = end;
    }
    return options;
  }
  prototype9.finishNode = function (arg, arg2) {
    return fn18.call(this, arg, arg2, this.lastTokEnd, this.lastTokEndLoc);
  };
  prototype9.finishNodeAt = function (arg, arg2, arg3, arg4) {
    return fn18.call(this, arg, arg2, arg3, arg4);
  };
  prototype9.copyNode = function (list4) {
    var node = new Node(this, list4.start, this.startLoc);
    for (var key in list4) {
      node[key] = list4[key];
    }
    return node;
  };
  var text4 = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS";
  var text5 = text4 + " Extended_Pictographic";
  var text52 = text5;
  var text6 = text52 + " EBase EComp EMod EPres ExtPict";
  var text62 = text6;
  var text622 = text62;
  var obj8 = {
    9: text4,
    10: text5,
    11: text52,
    12: text6,
    13: text62,
    14: text622
  };
  var text7 = "Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji";
  var obj9 = {
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: text7
  };
  var text8 = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu";
  var text9 = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb";
  var text10 = text9 + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd";
  var text11 = text10 + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho";
  var text12 = text11 + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi";
  var text13 = text12 + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith";
  var text14 = text13 + " Hrkt Katakana_Or_Hiragana Kawi Nag_Mundari Nagm Unknown Zzzz";
  var obj10 = {
    9: text9,
    10: text10,
    11: text11,
    12: text12,
    13: text13,
    14: text14
  };
  var obj11 = {};
  function fn19(index) {
    var obj13 = obj11[index] = {
      binary: fn7(obj8[index] + " " + text8),
      binaryOfStrings: fn7(obj9[index]),
      nonBinary: {
        General_Category: fn7(text8),
        Script: fn7(obj10[index])
      }
    };
    obj13.nonBinary.Script_Extensions = obj13.nonBinary.Script;
    obj13.nonBinary.gc = obj13.nonBinary.General_Category;
    obj13.nonBinary.sc = obj13.nonBinary.Script;
    obj13.nonBinary.scx = obj13.nonBinary.Script_Extensions;
  }
  for (var i = 0, i2 = [9, 10, 11, 12, 13, 14]; i < i2.length; i += 1) {
    var item = i2[i];
    fn19(item);
  }
  var prototype10 = Parser.prototype;
  var fn20 = function fn40(parent, arg) {
    this.parent = parent;
    this.base = arg || this;
  };
  fn20.prototype.separatedFrom = function fn40(arg) {
    for (var self = this; self; self = self.parent) {
      for (var j = arg; j; j = j.parent) {
        if (self.base === j.base && self !== j) {
          return true;
        }
      }
    }
    return false;
  };
  fn20.prototype.sibling = function fn40() {
    return new fn20(this.parent, this.base);
  };
  var fn21 = function fn40(parser) {
    this.parser = parser;
    this.validFlags = "gim" + (parser.options.ecmaVersion >= 6 ? "uy" : "") + (parser.options.ecmaVersion >= 9 ? "s" : "") + (parser.options.ecmaVersion >= 13 ? "d" : "") + (parser.options.ecmaVersion >= 15 ? "v" : "");
    this.unicodeProperties = obj11[parser.options.ecmaVersion >= 14 ? 14 : parser.options.ecmaVersion];
    this.source = "";
    this.flags = "";
    this.start = 0;
    this.switchU = false;
    this.switchV = false;
    this.switchN = false;
    this.pos = 0;
    this.lastIntValue = 0;
    this.lastStringValue = "";
    this.lastAssertionIsQuantifiable = false;
    this.numCapturingParens = 0;
    this.maxBackReference = 0;
    this.groupNames = Object.create(null);
    this.backReferenceNames = [];
    this.branchID = null;
  };
  fn21.prototype.reset = function fn40(num23, arg, flags) {
    var flag2 = flags.indexOf("v") !== -1;
    var flag3 = flags.indexOf("u") !== -1;
    this.start = num23 | 0;
    this.source = arg + "";
    this.flags = flags;
    if (flag2 && this.parser.options.ecmaVersion >= 15) {
      this.switchU = true;
      this.switchV = true;
      this.switchN = true;
    } else {
      this.switchU = flag3 && this.parser.options.ecmaVersion >= 6;
      this.switchV = false;
      this.switchN = flag3 && this.parser.options.ecmaVersion >= 9;
    }
  };
  fn21.prototype.raise = function fn40(arg) {
    this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + arg);
  };
  fn21.prototype.at = function fn40(num23, arg) {
    if (arg === void 0) arg = false;
    var source = this.source;
    var len = source.length;
    if (num23 >= len) {
      return -1;
    }
    var charCodeAt = source.charCodeAt(num23);
    if (!(arg || this.switchU) || charCodeAt <= 55295 || charCodeAt >= 57344 || num23 + 1 >= len) {
      return charCodeAt;
    }
    var charCodeAt2 = source.charCodeAt(num23 + 1);
    return charCodeAt2 >= 56320 && charCodeAt2 <= 57343 ? (charCodeAt << 10) + charCodeAt2 - 56613888 : charCodeAt;
  };
  fn21.prototype.nextIndex = function fn40(num23, arg) {
    if (arg === void 0) arg = false;
    var source = this.source;
    var len = source.length;
    if (num23 >= len) {
      return len;
    }
    var charCodeAt = source.charCodeAt(num23),
      charCodeAt2;
    if (!(arg || this.switchU) || charCodeAt <= 55295 || charCodeAt >= 57344 || num23 + 1 >= len || (charCodeAt2 = source.charCodeAt(num23 + 1)) < 56320 || charCodeAt2 > 57343) {
      return num23 + 1;
    }
    return num23 + 2;
  };
  fn21.prototype.current = function fn40(arg) {
    if (arg === void 0) arg = false;
    return this.at(this.pos, arg);
  };
  fn21.prototype.lookahead = function fn40(arg) {
    if (arg === void 0) arg = false;
    return this.at(this.nextIndex(this.pos, arg), arg);
  };
  fn21.prototype.advance = function fn40(arg) {
    if (arg === void 0) arg = false;
    this.pos = this.nextIndex(this.pos, arg);
  };
  fn21.prototype.eat = function fn40(arg, arg2) {
    if (arg2 === void 0) arg2 = false;
    if (this.current(arg2) === arg) {
      this.advance(arg2);
      return true;
    }
    return false;
  };
  fn21.prototype.eatChars = function fn40(arg, arg2) {
    if (arg2 === void 0) arg2 = false;
    var pos = this.pos;
    for (var i3 = 0, i4 = arg; i3 < i4.length; i3 += 1) {
      var item2 = i4[i3];
      var result = this.at(pos, arg2);
      if (result === -1 || result !== item2) {
        return false;
      }
      pos = this.nextIndex(pos, arg2);
    }
    this.pos = pos;
    return true;
  };
  prototype10.validateRegExpFlags = function (options) {
    var validFlags = options.validFlags;
    var flags = options.flags;
    var flag2 = false;
    var flag3 = false;
    for (var i3 = 0; i3 < flags.length; i3++) {
      var charAt = flags.charAt(i3);
      if (validFlags.indexOf(charAt) === -1) {
        this.raise(options.start, "Invalid regular expression flag");
      }
      if (flags.indexOf(charAt, i3 + 1) > -1) {
        this.raise(options.start, "Duplicate regular expression flag");
      }
      if (charAt === "u") {
        flag2 = true;
      }
      if (charAt === "v") {
        flag3 = true;
      }
    }
    if (this.options.ecmaVersion >= 15 && flag2 && flag3) {
      this.raise(options.start, "Invalid regular expression flag");
    }
  };
  function fn22(arg) {
    for (var _ in arg) {
      return true;
    }
    return false;
  }
  prototype10.validateRegExpPattern = function (obj13) {
    this.regexp_pattern(obj13);
    if (!obj13.switchN && this.options.ecmaVersion >= 9 && fn22(obj13.groupNames)) {
      obj13.switchN = true;
      this.regexp_pattern(obj13);
    }
  };
  prototype10.regexp_pattern = function (options) {
    options.pos = 0;
    options.lastIntValue = 0;
    options.lastStringValue = "";
    options.lastAssertionIsQuantifiable = false;
    options.numCapturingParens = 0;
    options.maxBackReference = 0;
    options.groupNames = Object.create(null);
    options.backReferenceNames.length = 0;
    options.branchID = null;
    this.regexp_disjunction(options);
    if (options.pos !== options.source.length) {
      if (options.eat(41)) {
        options.raise("Unmatched ')'");
      }
      if (options.eat(93) || options.eat(125)) {
        options.raise("Lone quantifier brackets");
      }
    }
    if (options.maxBackReference > options.numCapturingParens) {
      options.raise("Invalid escape");
    }
    for (var i3 = 0, i4 = options.backReferenceNames; i3 < i4.length; i3 += 1) {
      var item2 = i4[i3];
      if (!options.groupNames[item2]) {
        options.raise("Invalid named capture referenced");
      }
    }
  };
  prototype10.regexp_disjunction = function (options) {
    var flag2 = this.options.ecmaVersion >= 16;
    if (flag2) {
      options.branchID = new fn20(options.branchID, null);
    }
    this.regexp_alternative(options);
    while (options.eat(124)) {
      if (flag2) {
        options.branchID = options.branchID.sibling();
      }
      this.regexp_alternative(options);
    }
    if (flag2) {
      options.branchID = options.branchID.parent;
    }
    if (this.regexp_eatQuantifier(options, true)) {
      options.raise("Nothing to repeat");
    }
    if (options.eat(123)) {
      options.raise("Lone quantifier brackets");
    }
  };
  prototype10.regexp_alternative = function (obj13) {
    while (obj13.pos < obj13.source.length && this.regexp_eatTerm(obj13)) {}
  };
  prototype10.regexp_eatTerm = function (options) {
    if (this.regexp_eatAssertion(options)) {
      if (options.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(options)) {
        if (options.switchU) {
          options.raise("Invalid quantifier");
        }
      }
      return true;
    }
    if (options.switchU ? this.regexp_eatAtom(options) : this.regexp_eatExtendedAtom(options)) {
      this.regexp_eatQuantifier(options);
      return true;
    }
    return false;
  };
  prototype10.regexp_eatAssertion = function (options) {
    var pos = options.pos;
    options.lastAssertionIsQuantifiable = false;
    if (options.eat(94) || options.eat(36)) {
      return true;
    }
    if (options.eat(92)) {
      if (options.eat(66) || options.eat(98)) {
        return true;
      }
      options.pos = pos;
    }
    if (options.eat(40) && options.eat(63)) {
      var flag2 = false;
      if (this.options.ecmaVersion >= 9) {
        flag2 = options.eat(60);
      }
      if (options.eat(61) || options.eat(33)) {
        this.regexp_disjunction(options);
        if (!options.eat(41)) {
          options.raise("Unterminated group");
        }
        options.lastAssertionIsQuantifiable = !flag2;
        return true;
      }
    }
    options.pos = pos;
    return false;
  };
  prototype10.regexp_eatQuantifier = function (obj13, arg) {
    if (arg === void 0) arg = false;
    if (this.regexp_eatQuantifierPrefix(obj13, arg)) {
      obj13.eat(63);
      return true;
    }
    return false;
  };
  prototype10.regexp_eatQuantifierPrefix = function (obj13, arg) {
    return obj13.eat(42) || obj13.eat(43) || obj13.eat(63) || this.regexp_eatBracedQuantifier(obj13, arg);
  };
  prototype10.regexp_eatBracedQuantifier = function (options, flag2) {
    var pos = options.pos;
    if (options.eat(123)) {
      var num23 = 0,
        num24 = -1;
      if (this.regexp_eatDecimalDigits(options)) {
        num23 = options.lastIntValue;
        if (options.eat(44) && this.regexp_eatDecimalDigits(options)) {
          num24 = options.lastIntValue;
        }
        if (options.eat(125)) {
          if (num24 !== -1 && num24 < num23 && !flag2) {
            options.raise("numbers out of order in {} quantifier");
          }
          return true;
        }
      }
      if (options.switchU && !flag2) {
        options.raise("Incomplete quantifier");
      }
      options.pos = pos;
    }
    return false;
  };
  prototype10.regexp_eatAtom = function (obj13) {
    return this.regexp_eatPatternCharacters(obj13) || obj13.eat(46) || this.regexp_eatReverseSolidusAtomEscape(obj13) || this.regexp_eatCharacterClass(obj13) || this.regexp_eatUncapturingGroup(obj13) || this.regexp_eatCapturingGroup(obj13);
  };
  prototype10.regexp_eatReverseSolidusAtomEscape = function (obj13) {
    var pos = obj13.pos;
    if (obj13.eat(92)) {
      if (this.regexp_eatAtomEscape(obj13)) {
        return true;
      }
      obj13.pos = pos;
    }
    return false;
  };
  prototype10.regexp_eatUncapturingGroup = function (options) {
    var pos = options.pos;
    if (options.eat(40)) {
      if (options.eat(63) && options.eat(58)) {
        this.regexp_disjunction(options);
        if (options.eat(41)) {
          return true;
        }
        options.raise("Unterminated group");
      }
      options.pos = pos;
    }
    return false;
  };
  prototype10.regexp_eatCapturingGroup = function (options) {
    if (options.eat(40)) {
      if (this.options.ecmaVersion >= 9) {
        this.regexp_groupSpecifier(options);
      } else if (options.current() === 63) {
        options.raise("Invalid group");
      }
      this.regexp_disjunction(options);
      if (options.eat(41)) {
        options.numCapturingParens += 1;
        return true;
      }
      options.raise("Unterminated group");
    }
    return false;
  };
  prototype10.regexp_eatExtendedAtom = function (obj13) {
    return obj13.eat(46) || this.regexp_eatReverseSolidusAtomEscape(obj13) || this.regexp_eatCharacterClass(obj13) || this.regexp_eatUncapturingGroup(obj13) || this.regexp_eatCapturingGroup(obj13) || this.regexp_eatInvalidBracedQuantifier(obj13) || this.regexp_eatExtendedPatternCharacter(obj13);
  };
  prototype10.regexp_eatInvalidBracedQuantifier = function (obj13) {
    if (this.regexp_eatBracedQuantifier(obj13, true)) {
      obj13.raise("Nothing to repeat");
    }
    return false;
  };
  prototype10.regexp_eatSyntaxCharacter = function (options) {
    var lastIntValue = options.current();
    if (fn23(lastIntValue)) {
      options.lastIntValue = lastIntValue;
      options.advance();
      return true;
    }
    return false;
  };
  function fn23(num23) {
    return num23 === 36 || num23 >= 40 && num23 <= 43 || num23 === 46 || num23 === 63 || num23 >= 91 && num23 <= 94 || num23 >= 123 && num23 <= 125;
  }
  prototype10.regexp_eatPatternCharacters = function (options) {
    var pos = options.pos;
    var num23 = 0;
    while ((num23 = options.current()) !== -1 && !fn23(num23)) {
      options.advance();
    }
    return options.pos !== pos;
  };
  prototype10.regexp_eatExtendedPatternCharacter = function (obj13) {
    var current = obj13.current();
    if (current !== -1 && current !== 36 && !(current >= 40 && current <= 43) && current !== 46 && current !== 63 && current !== 91 && current !== 94 && current !== 124) {
      obj13.advance();
      return true;
    }
    return false;
  };
  prototype10.regexp_groupSpecifier = function (options) {
    if (options.eat(63)) {
      if (!this.regexp_eatGroupName(options)) {
        options.raise("Invalid group");
      }
      var flag2 = this.options.ecmaVersion >= 16;
      var item2 = options.groupNames[options.lastStringValue];
      if (item2) {
        if (flag2) {
          for (var i3 = 0, i4 = item2; i3 < i4.length; i3 += 1) {
            var item3 = i4[i3];
            if (!item3.separatedFrom(options.branchID)) {
              options.raise("Duplicate capture group name");
            }
          }
        } else {
          options.raise("Duplicate capture group name");
        }
      }
      if (flag2) {
        (item2 || (options.groupNames[options.lastStringValue] = [])).push(options.branchID);
      } else {
        options.groupNames[options.lastStringValue] = true;
      }
    }
  };
  prototype10.regexp_eatGroupName = function (options) {
    options.lastStringValue = "";
    if (options.eat(60)) {
      if (this.regexp_eatRegExpIdentifierName(options) && options.eat(62)) {
        return true;
      }
      options.raise("Invalid capture group name");
    }
    return false;
  };
  prototype10.regexp_eatRegExpIdentifierName = function (obj13) {
    obj13.lastStringValue = "";
    if (this.regexp_eatRegExpIdentifierStart(obj13)) {
      obj13.lastStringValue += fn8(obj13.lastIntValue);
      while (this.regexp_eatRegExpIdentifierPart(obj13)) {
        obj13.lastStringValue += fn8(obj13.lastIntValue);
      }
      return true;
    }
    return false;
  };
  prototype10.regexp_eatRegExpIdentifierStart = function (options) {
    var pos = options.pos;
    var flag2 = this.options.ecmaVersion >= 11;
    var lastIntValue = options.current(flag2);
    options.advance(flag2);
    if (lastIntValue === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(options, flag2)) {
      lastIntValue = options.lastIntValue;
    }
    if (fn24(lastIntValue)) {
      options.lastIntValue = lastIntValue;
      return true;
    }
    options.pos = pos;
    return false;
  };
  function fn24(arg) {
    return isIdentifierStart(arg, true) || arg === 36 || arg === 95;
  }
  prototype10.regexp_eatRegExpIdentifierPart = function (options) {
    var pos = options.pos;
    var flag2 = this.options.ecmaVersion >= 11;
    var lastIntValue = options.current(flag2);
    options.advance(flag2);
    if (lastIntValue === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(options, flag2)) {
      lastIntValue = options.lastIntValue;
    }
    if (fn25(lastIntValue)) {
      options.lastIntValue = lastIntValue;
      return true;
    }
    options.pos = pos;
    return false;
  };
  function fn25(arg) {
    return isIdentifierChar(arg, true) || arg === 36 || arg === 95 || arg === 8204 || arg === 8205;
  }
  prototype10.regexp_eatAtomEscape = function (options) {
    if (this.regexp_eatBackReference(options) || this.regexp_eatCharacterClassEscape(options) || this.regexp_eatCharacterEscape(options) || options.switchN && this.regexp_eatKGroupName(options)) {
      return true;
    }
    if (options.switchU) {
      if (options.current() === 99) {
        options.raise("Invalid unicode escape");
      }
      options.raise("Invalid escape");
    }
    return false;
  };
  prototype10.regexp_eatBackReference = function (options) {
    var pos = options.pos;
    if (this.regexp_eatDecimalEscape(options)) {
      var maxBackReference = options.lastIntValue;
      if (options.switchU) {
        if (maxBackReference > options.maxBackReference) {
          options.maxBackReference = maxBackReference;
        }
        return true;
      }
      if (maxBackReference <= options.numCapturingParens) {
        return true;
      }
      options.pos = pos;
    }
    return false;
  };
  prototype10.regexp_eatKGroupName = function (options) {
    if (options.eat(107)) {
      if (this.regexp_eatGroupName(options)) {
        options.backReferenceNames.push(options.lastStringValue);
        return true;
      }
      options.raise("Invalid named reference");
    }
    return false;
  };
  prototype10.regexp_eatCharacterEscape = function (obj13) {
    return this.regexp_eatControlEscape(obj13) || this.regexp_eatCControlLetter(obj13) || this.regexp_eatZero(obj13) || this.regexp_eatHexEscapeSequence(obj13) || this.regexp_eatRegExpUnicodeEscapeSequence(obj13, false) || !obj13.switchU && this.regexp_eatLegacyOctalEscapeSequence(obj13) || this.regexp_eatIdentityEscape(obj13);
  };
  prototype10.regexp_eatCControlLetter = function (obj13) {
    var pos = obj13.pos;
    if (obj13.eat(99)) {
      if (this.regexp_eatControlLetter(obj13)) {
        return true;
      }
      obj13.pos = pos;
    }
    return false;
  };
  prototype10.regexp_eatZero = function (options) {
    if (options.current() === 48 && !fn34(options.lookahead())) {
      options.lastIntValue = 0;
      options.advance();
      return true;
    }
    return false;
  };
  prototype10.regexp_eatControlEscape = function (options) {
    var current = options.current();
    if (current === 116) {
      options.lastIntValue = 0x09;
      options.advance();
      return true;
    }
    if (current === 110) {
      options.lastIntValue = 0x0A;
      options.advance();
      return true;
    }
    if (current === 118) {
      options.lastIntValue = 0x0B;
      options.advance();
      return true;
    }
    if (current === 102) {
      options.lastIntValue = 0x0C;
      options.advance();
      return true;
    }
    if (current === 114) {
      options.lastIntValue = 0x0D;
      options.advance();
      return true;
    }
    return false;
  };
  prototype10.regexp_eatControlLetter = function (options) {
    var current = options.current();
    if (fn26(current)) {
      options.lastIntValue = current % 32;
      options.advance();
      return true;
    }
    return false;
  };
  function fn26(num23) {
    return num23 >= 65 && num23 <= 90 || num23 >= 97 && num23 <= 122;
  }
  prototype10.regexp_eatRegExpUnicodeEscapeSequence = function (options, arg) {
    if (arg === void 0) arg = false;
    var pos = options.pos;
    var switchU = arg || options.switchU;
    if (options.eat(117)) {
      if (this.regexp_eatFixedHexDigits(options, 4)) {
        var lastIntValue = options.lastIntValue;
        if (switchU && lastIntValue >= 55296 && lastIntValue <= 56319) {
          var pos2 = options.pos;
          if (options.eat(92) && options.eat(117) && this.regexp_eatFixedHexDigits(options, 4)) {
            var lastIntValue2 = options.lastIntValue;
            if (lastIntValue2 >= 56320 && lastIntValue2 <= 57343) {
              options.lastIntValue = (lastIntValue - 55296) * 1024 + (lastIntValue2 - 56320) + 65536;
              return true;
            }
          }
          options.pos = pos2;
          options.lastIntValue = lastIntValue;
        }
        return true;
      }
      if (switchU && options.eat(123) && this.regexp_eatHexDigits(options) && options.eat(125) && fn27(options.lastIntValue)) {
        return true;
      }
      if (switchU) {
        options.raise("Invalid unicode escape");
      }
      options.pos = pos;
    }
    return false;
  };
  function fn27(num23) {
    return num23 >= 0 && num23 <= 1114111;
  }
  prototype10.regexp_eatIdentityEscape = function (options) {
    if (options.switchU) {
      if (this.regexp_eatSyntaxCharacter(options)) {
        return true;
      }
      if (options.eat(47)) {
        options.lastIntValue = 47;
        return true;
      }
      return false;
    }
    var lastIntValue = options.current();
    if (lastIntValue !== 99 && (!options.switchN || lastIntValue !== 107)) {
      options.lastIntValue = lastIntValue;
      options.advance();
      return true;
    }
    return false;
  };
  prototype10.regexp_eatDecimalEscape = function (options) {
    options.lastIntValue = 0;
    var current = options.current();
    if (current >= 49 && current <= 57) {
      do {
        options.lastIntValue = 10 * options.lastIntValue + (current - 48);
        options.advance();
      } while ((current = options.current()) >= 48 && current <= 57);
      return true;
    }
    return false;
  };
  var num20 = 0;
  var num21 = 1;
  var num22 = 2;
  prototype10.regexp_eatCharacterClassEscape = function (options) {
    var current = options.current();
    if (fn28(current)) {
      options.lastIntValue = -1;
      options.advance();
      return num21;
    }
    var flag2 = false;
    if (options.switchU && this.options.ecmaVersion >= 9 && ((flag2 = current === 80) || current === 112)) {
      options.lastIntValue = -1;
      options.advance();
      var regexp_eatUnicodePropertyValueExpression;
      if (options.eat(123) && (regexp_eatUnicodePropertyValueExpression = this.regexp_eatUnicodePropertyValueExpression(options)) && options.eat(125)) {
        if (flag2 && regexp_eatUnicodePropertyValueExpression === num22) {
          options.raise("Invalid property name");
        }
        return regexp_eatUnicodePropertyValueExpression;
      }
      options.raise("Invalid property name");
    }
    return num20;
  };
  function fn28(arg) {
    return arg === 100 || arg === 68 || arg === 115 || arg === 83 || arg === 119 || arg === 87;
  }
  prototype10.regexp_eatUnicodePropertyValueExpression = function (options) {
    var pos = options.pos;
    if (this.regexp_eatUnicodePropertyName(options) && options.eat(61)) {
      var lastStringValue = options.lastStringValue;
      if (this.regexp_eatUnicodePropertyValue(options)) {
        var lastStringValue2 = options.lastStringValue;
        this.regexp_validateUnicodePropertyNameAndValue(options, lastStringValue, lastStringValue2);
        return num21;
      }
    }
    options.pos = pos;
    if (this.regexp_eatLoneUnicodePropertyNameOrValue(options)) {
      var lastStringValue3 = options.lastStringValue;
      return this.regexp_validateUnicodePropertyNameOrValue(options, lastStringValue3);
    }
    return num20;
  };
  prototype10.regexp_validateUnicodePropertyNameAndValue = function (obj13, index, arg) {
    if (!fn5(obj13.unicodeProperties.nonBinary, index)) {
      obj13.raise("Invalid property name");
    }
    if (!obj13.unicodeProperties.nonBinary[index].test(arg)) {
      obj13.raise("Invalid property value");
    }
  };
  prototype10.regexp_validateUnicodePropertyNameOrValue = function (options, arg) {
    if (options.unicodeProperties.binary.test(arg)) {
      return num21;
    }
    if (options.switchV && options.unicodeProperties.binaryOfStrings.test(arg)) {
      return num22;
    }
    options.raise("Invalid property name");
  };
  prototype10.regexp_eatUnicodePropertyName = function (options) {
    var num23 = 0;
    options.lastStringValue = "";
    while (fn29(num23 = options.current())) {
      options.lastStringValue += fn8(num23);
      options.advance();
    }
    return options.lastStringValue !== "";
  };
  function fn29(arg) {
    return fn26(arg) || arg === 95;
  }
  prototype10.regexp_eatUnicodePropertyValue = function (options) {
    var num23 = 0;
    options.lastStringValue = "";
    while (fn30(num23 = options.current())) {
      options.lastStringValue += fn8(num23);
      options.advance();
    }
    return options.lastStringValue !== "";
  };
  function fn30(arg) {
    return fn29(arg) || fn34(arg);
  }
  prototype10.regexp_eatLoneUnicodePropertyNameOrValue = function (arg) {
    return this.regexp_eatUnicodePropertyValue(arg);
  };
  prototype10.regexp_eatCharacterClass = function (obj13) {
    if (obj13.eat(91)) {
      var eat = obj13.eat(94);
      var regexp_classContents = this.regexp_classContents(obj13);
      if (!obj13.eat(93)) {
        obj13.raise("Unterminated character class");
      }
      if (eat && regexp_classContents === num22) {
        obj13.raise("Negated character class may contain strings");
      }
      return true;
    }
    return false;
  };
  prototype10.regexp_classContents = function (obj13) {
    if (obj13.current() === 93) {
      return num21;
    }
    if (obj13.switchV) {
      return this.regexp_classSetExpression(obj13);
    }
    this.regexp_nonEmptyClassRanges(obj13);
    return num21;
  };
  prototype10.regexp_nonEmptyClassRanges = function (options) {
    while (this.regexp_eatClassAtom(options)) {
      var lastIntValue = options.lastIntValue;
      if (options.eat(45) && this.regexp_eatClassAtom(options)) {
        var lastIntValue2 = options.lastIntValue;
        if (options.switchU && (lastIntValue === -1 || lastIntValue2 === -1)) {
          options.raise("Invalid character class");
        }
        if (lastIntValue !== -1 && lastIntValue2 !== -1 && lastIntValue > lastIntValue2) {
          options.raise("Range out of order in character class");
        }
      }
    }
  };
  prototype10.regexp_eatClassAtom = function (options) {
    var pos = options.pos;
    if (options.eat(92)) {
      if (this.regexp_eatClassEscape(options)) {
        return true;
      }
      if (options.switchU) {
        var current = options.current();
        if (current === 99 || fn37(current)) {
          options.raise("Invalid class escape");
        }
        options.raise("Invalid escape");
      }
      options.pos = pos;
    }
    var lastIntValue = options.current();
    if (lastIntValue !== 93) {
      options.lastIntValue = lastIntValue;
      options.advance();
      return true;
    }
    return false;
  };
  prototype10.regexp_eatClassEscape = function (options) {
    var pos = options.pos;
    if (options.eat(98)) {
      options.lastIntValue = 0x08;
      return true;
    }
    if (options.switchU && options.eat(45)) {
      options.lastIntValue = 45;
      return true;
    }
    if (!options.switchU && options.eat(99)) {
      if (this.regexp_eatClassControlLetter(options)) {
        return true;
      }
      options.pos = pos;
    }
    return this.regexp_eatCharacterClassEscape(options) || this.regexp_eatCharacterEscape(options);
  };
  prototype10.regexp_classSetExpression = function (options) {
    var num212 = num21,
      regexp_eatClassSetOperand;
    if (this.regexp_eatClassSetRange(options)) ;else if (regexp_eatClassSetOperand = this.regexp_eatClassSetOperand(options)) {
      if (regexp_eatClassSetOperand === num22) {
        num212 = num22;
      }
      var pos = options.pos;
      while (options.eatChars([38, 38])) {
        if (options.current() !== 38 && (regexp_eatClassSetOperand = this.regexp_eatClassSetOperand(options))) {
          if (regexp_eatClassSetOperand !== num22) {
            num212 = num21;
          }
          continue;
        }
        options.raise("Invalid character in character class");
      }
      if (pos !== options.pos) {
        return num212;
      }
      while (options.eatChars([45, 45])) {
        if (this.regexp_eatClassSetOperand(options)) {
          continue;
        }
        options.raise("Invalid character in character class");
      }
      if (pos !== options.pos) {
        return num212;
      }
    } else {
      options.raise("Invalid character in character class");
    }
    for (;;) {
      if (this.regexp_eatClassSetRange(options)) {
        continue;
      }
      regexp_eatClassSetOperand = this.regexp_eatClassSetOperand(options);
      if (!regexp_eatClassSetOperand) {
        return num212;
      }
      if (regexp_eatClassSetOperand === num22) {
        num212 = num22;
      }
    }
  };
  prototype10.regexp_eatClassSetRange = function (options) {
    var pos = options.pos;
    if (this.regexp_eatClassSetCharacter(options)) {
      var lastIntValue = options.lastIntValue;
      if (options.eat(45) && this.regexp_eatClassSetCharacter(options)) {
        var lastIntValue2 = options.lastIntValue;
        if (lastIntValue !== -1 && lastIntValue2 !== -1 && lastIntValue > lastIntValue2) {
          options.raise("Range out of order in character class");
        }
        return true;
      }
      options.pos = pos;
    }
    return false;
  };
  prototype10.regexp_eatClassSetOperand = function (arg) {
    if (this.regexp_eatClassSetCharacter(arg)) {
      return num21;
    }
    return this.regexp_eatClassStringDisjunction(arg) || this.regexp_eatNestedClass(arg);
  };
  prototype10.regexp_eatNestedClass = function (options) {
    var pos = options.pos;
    if (options.eat(91)) {
      var eat = options.eat(94);
      var regexp_classContents = this.regexp_classContents(options);
      if (options.eat(93)) {
        if (eat && regexp_classContents === num22) {
          options.raise("Negated character class may contain strings");
        }
        return regexp_classContents;
      }
      options.pos = pos;
    }
    if (options.eat(92)) {
      var regexp_eatCharacterClassEscape = this.regexp_eatCharacterClassEscape(options);
      if (regexp_eatCharacterClassEscape) {
        return regexp_eatCharacterClassEscape;
      }
      options.pos = pos;
    }
    return null;
  };
  prototype10.regexp_eatClassStringDisjunction = function (options) {
    var pos = options.pos;
    if (options.eatChars([92, 113])) {
      if (options.eat(123)) {
        var regexp_classStringDisjunctionContents = this.regexp_classStringDisjunctionContents(options);
        if (options.eat(125)) {
          return regexp_classStringDisjunctionContents;
        }
      } else {
        options.raise("Invalid escape");
      }
      options.pos = pos;
    }
    return null;
  };
  prototype10.regexp_classStringDisjunctionContents = function (obj13) {
    var regexp_classString = this.regexp_classString(obj13);
    while (obj13.eat(124)) {
      if (this.regexp_classString(obj13) === num22) {
        regexp_classString = num22;
      }
    }
    return regexp_classString;
  };
  prototype10.regexp_classString = function (arg) {
    var num23 = 0;
    while (this.regexp_eatClassSetCharacter(arg)) {
      num23++;
    }
    return num23 === 1 ? num21 : num22;
  };
  prototype10.regexp_eatClassSetCharacter = function (options) {
    var pos = options.pos;
    if (options.eat(92)) {
      if (this.regexp_eatCharacterEscape(options) || this.regexp_eatClassSetReservedPunctuator(options)) {
        return true;
      }
      if (options.eat(98)) {
        options.lastIntValue = 0x08;
        return true;
      }
      options.pos = pos;
      return false;
    }
    var lastIntValue = options.current();
    if (lastIntValue < 0 || lastIntValue === options.lookahead() && fn31(lastIntValue)) {
      return false;
    }
    if (fn32(lastIntValue)) {
      return false;
    }
    options.advance();
    options.lastIntValue = lastIntValue;
    return true;
  };
  function fn31(num23) {
    return num23 === 33 || num23 >= 35 && num23 <= 38 || num23 >= 42 && num23 <= 44 || num23 === 46 || num23 >= 58 && num23 <= 64 || num23 === 94 || num23 === 96 || num23 === 126;
  }
  function fn32(num23) {
    return num23 === 40 || num23 === 41 || num23 === 45 || num23 === 47 || num23 >= 91 && num23 <= 93 || num23 >= 123 && num23 <= 125;
  }
  prototype10.regexp_eatClassSetReservedPunctuator = function (options) {
    var lastIntValue = options.current();
    if (fn33(lastIntValue)) {
      options.lastIntValue = lastIntValue;
      options.advance();
      return true;
    }
    return false;
  };
  function fn33(num23) {
    return num23 === 33 || num23 === 35 || num23 === 37 || num23 === 38 || num23 === 44 || num23 === 45 || num23 >= 58 && num23 <= 62 || num23 === 64 || num23 === 96 || num23 === 126;
  }
  prototype10.regexp_eatClassControlLetter = function (options) {
    var current = options.current();
    if (fn34(current) || current === 95) {
      options.lastIntValue = current % 32;
      options.advance();
      return true;
    }
    return false;
  };
  prototype10.regexp_eatHexEscapeSequence = function (options) {
    var pos = options.pos;
    if (options.eat(120)) {
      if (this.regexp_eatFixedHexDigits(options, 2)) {
        return true;
      }
      if (options.switchU) {
        options.raise("Invalid escape");
      }
      options.pos = pos;
    }
    return false;
  };
  prototype10.regexp_eatDecimalDigits = function (options) {
    var pos = options.pos;
    var num23 = 0;
    options.lastIntValue = 0;
    while (fn34(num23 = options.current())) {
      options.lastIntValue = 10 * options.lastIntValue + (num23 - 48);
      options.advance();
    }
    return options.pos !== pos;
  };
  function fn34(num23) {
    return num23 >= 48 && num23 <= 57;
  }
  prototype10.regexp_eatHexDigits = function (options) {
    var pos = options.pos;
    var num23 = 0;
    options.lastIntValue = 0;
    while (fn35(num23 = options.current())) {
      options.lastIntValue = 16 * options.lastIntValue + fn36(num23);
      options.advance();
    }
    return options.pos !== pos;
  };
  function fn35(num23) {
    return num23 >= 48 && num23 <= 57 || num23 >= 65 && num23 <= 70 || num23 >= 97 && num23 <= 102;
  }
  function fn36(num23) {
    if (num23 >= 65 && num23 <= 70) {
      return 10 + (num23 - 65);
    }
    if (num23 >= 97 && num23 <= 102) {
      return 10 + (num23 - 97);
    }
    return num23 - 48;
  }
  prototype10.regexp_eatLegacyOctalEscapeSequence = function (obj13) {
    if (this.regexp_eatOctalDigit(obj13)) {
      var lastIntValue = obj13.lastIntValue;
      if (this.regexp_eatOctalDigit(obj13)) {
        var lastIntValue2 = obj13.lastIntValue;
        if (lastIntValue <= 3 && this.regexp_eatOctalDigit(obj13)) {
          obj13.lastIntValue = lastIntValue * 64 + lastIntValue2 * 8 + obj13.lastIntValue;
        } else {
          obj13.lastIntValue = lastIntValue * 8 + lastIntValue2;
        }
      } else {
        obj13.lastIntValue = lastIntValue;
      }
      return true;
    }
    return false;
  };
  prototype10.regexp_eatOctalDigit = function (options) {
    var current = options.current();
    if (fn37(current)) {
      options.lastIntValue = current - 48;
      options.advance();
      return true;
    }
    options.lastIntValue = 0;
    return false;
  };
  function fn37(num23) {
    return num23 >= 48 && num23 <= 55;
  }
  prototype10.regexp_eatFixedHexDigits = function (options, num23) {
    var pos = options.pos;
    options.lastIntValue = 0;
    for (var i3 = 0; i3 < num23; ++i3) {
      var current = options.current();
      if (!fn35(current)) {
        options.pos = pos;
        return false;
      }
      options.lastIntValue = 16 * options.lastIntValue + fn36(current);
      options.advance();
    }
    return true;
  };
  var Token = function fn40(options) {
    this.type = options.type;
    this.value = options.value;
    this.start = options.start;
    this.end = options.end;
    if (options.options.locations) {
      this.loc = new SourceLocation(options, options.startLoc, options.endLoc);
    }
    if (options.options.ranges) {
      this.range = [options.start, options.end];
    }
  };
  var prototype11 = Parser.prototype;
  prototype11.next = function (flag2) {
    if (!flag2 && this.type.keyword && this.containsEsc) {
      this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword);
    }
    if (this.options.onToken) {
      this.options.onToken(new Token(this));
    }
    this.lastTokEnd = this.end;
    this.lastTokStart = this.start;
    this.lastTokEndLoc = this.endLoc;
    this.lastTokStartLoc = this.startLoc;
    this.nextToken();
  };
  prototype11.getToken = function () {
    this.next();
    return new Token(this);
  };
  if (typeof Symbol !== "undefined") {
    prototype11[Symbol.iterator] = function () {
      var self2 = this;
      return {
        next: function () {
          var value = self2.getToken();
          return {
            done: value.type === types$1.eof,
            value
          };
        }
      };
    };
  }
  prototype11.nextToken = function () {
    var curContext = this.curContext();
    if (!curContext || !curContext.preserveSpace) {
      this.skipSpace();
    }
    this.start = this.pos;
    if (this.options.locations) {
      this.startLoc = this.curPosition();
    }
    if (this.pos >= this.input.length) {
      return this.finishToken(types$1.eof);
    }
    if (curContext.override) {
      return curContext.override(this);
    } else {
      this.readToken(this.fullCharCodeAtPos());
    }
  };
  prototype11.readToken = function (arg) {
    if (isIdentifierStart(arg, this.options.ecmaVersion >= 6) || arg === 92) {
      return this.readWord();
    }
    return this.getTokenFromCode(arg);
  };
  prototype11.fullCharCodeAtPos = function () {
    var charCodeAt = this.input.charCodeAt(this.pos);
    if (charCodeAt <= 55295 || charCodeAt >= 56320) {
      return charCodeAt;
    }
    var charCodeAt2 = this.input.charCodeAt(this.pos + 1);
    return charCodeAt2 <= 56319 || charCodeAt2 >= 57344 ? charCodeAt : (charCodeAt << 10) + charCodeAt2 - 56613888;
  };
  prototype11.skipBlockComment = function () {
    var curPosition = this.options.onComment && this.curPosition();
    var pos = this.pos,
      index = this.input.indexOf("*/", this.pos += 2);
    if (index === -1) {
      this.raise(this.pos - 2, "Unterminated comment");
    }
    this.pos = index + 2;
    if (this.options.locations) {
      for (var lineStart = void 0, i3 = pos; (lineStart = fn4(this.input, i3, this.pos)) > -1;) {
        ++this.curLine;
        i3 = this.lineStart = lineStart;
      }
    }
    if (this.options.onComment) {
      this.options.onComment(true, this.input.slice(pos + 2, index), pos, this.pos, curPosition, this.curPosition());
    }
  };
  prototype11.skipLineComment = function (pos) {
    var pos2 = this.pos;
    var curPosition = this.options.onComment && this.curPosition();
    var charCodeAt = this.input.charCodeAt(this.pos += pos);
    while (this.pos < this.input.length && !isNewLine(charCodeAt)) {
      charCodeAt = this.input.charCodeAt(++this.pos);
    }
    if (this.options.onComment) {
      this.options.onComment(false, this.input.slice(pos2 + pos, this.pos), pos2, this.pos, curPosition, this.curPosition());
    }
  };
  prototype11.skipSpace = function () {
    loop: while (this.pos < this.input.length) {
      var charCodeAt = this.input.charCodeAt(this.pos);
      switch (charCodeAt) {
        case 32:
        case 160:
          ++this.pos;
          break;
        case 13:
          if (this.input.charCodeAt(this.pos + 1) === 10) {
            ++this.pos;
          }
        case 10:
        case 8232:
        case 8233:
          ++this.pos;
          if (this.options.locations) {
            ++this.curLine;
            this.lineStart = this.pos;
          }
          break;
        case 47:
          switch (this.input.charCodeAt(this.pos + 1)) {
            case 42:
              this.skipBlockComment();
              break;
            case 47:
              this.skipLineComment(2);
              break;
            default:
              break loop;
          }
          break;
        default:
          if (charCodeAt > 8 && charCodeAt < 14 || charCodeAt >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(charCodeAt))) {
            ++this.pos;
          } else {
            break loop;
          }
      }
    }
  };
  prototype11.finishToken = function (type, value) {
    this.end = this.pos;
    if (this.options.locations) {
      this.endLoc = this.curPosition();
    }
    var type2 = this.type;
    this.type = type;
    this.value = value;
    this.updateContext(type2);
  };
  prototype11.readToken_dot = function () {
    var charCodeAt = this.input.charCodeAt(this.pos + 1);
    if (charCodeAt >= 48 && charCodeAt <= 57) {
      return this.readNumber(true);
    }
    var charCodeAt2 = this.input.charCodeAt(this.pos + 2);
    if (this.options.ecmaVersion >= 6 && charCodeAt === 46 && charCodeAt2 === 46) {
      this.pos += 3;
      return this.finishToken(types$1.ellipsis);
    } else {
      ++this.pos;
      return this.finishToken(types$1.dot);
    }
  };
  prototype11.readToken_slash = function () {
    var charCodeAt = this.input.charCodeAt(this.pos + 1);
    if (this.exprAllowed) {
      ++this.pos;
      return this.readRegexp();
    }
    if (charCodeAt === 61) {
      return this.finishOp(types$1.assign, 2);
    }
    return this.finishOp(types$1.slash, 1);
  };
  prototype11.readToken_mult_modulo_exp = function (arg) {
    var charCodeAt = this.input.charCodeAt(this.pos + 1);
    var num23 = 1;
    var star = arg === 42 ? types$1.star : types$1.modulo;
    if (this.options.ecmaVersion >= 7 && arg === 42 && charCodeAt === 42) {
      ++num23;
      star = types$1.starstar;
      charCodeAt = this.input.charCodeAt(this.pos + 2);
    }
    if (charCodeAt === 61) {
      return this.finishOp(types$1.assign, num23 + 1);
    }
    return this.finishOp(star, num23);
  };
  prototype11.readToken_pipe_amp = function (arg) {
    var charCodeAt = this.input.charCodeAt(this.pos + 1);
    if (charCodeAt === arg) {
      if (this.options.ecmaVersion >= 12) {
        var charCodeAt2 = this.input.charCodeAt(this.pos + 2);
        if (charCodeAt2 === 61) {
          return this.finishOp(types$1.assign, 3);
        }
      }
      return this.finishOp(arg === 124 ? types$1.logicalOR : types$1.logicalAND, 2);
    }
    if (charCodeAt === 61) {
      return this.finishOp(types$1.assign, 2);
    }
    return this.finishOp(arg === 124 ? types$1.bitwiseOR : types$1.bitwiseAND, 1);
  };
  prototype11.readToken_caret = function () {
    var charCodeAt = this.input.charCodeAt(this.pos + 1);
    if (charCodeAt === 61) {
      return this.finishOp(types$1.assign, 2);
    }
    return this.finishOp(types$1.bitwiseXOR, 1);
  };
  prototype11.readToken_plus_min = function (arg) {
    var charCodeAt = this.input.charCodeAt(this.pos + 1);
    if (charCodeAt === arg) {
      if (charCodeAt === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || lineBreak.test(this.input.slice(this.lastTokEnd, this.pos)))) {
        this.skipLineComment(3);
        this.skipSpace();
        return this.nextToken();
      }
      return this.finishOp(types$1.incDec, 2);
    }
    if (charCodeAt === 61) {
      return this.finishOp(types$1.assign, 2);
    }
    return this.finishOp(types$1.plusMin, 1);
  };
  prototype11.readToken_lt_gt = function (arg) {
    var charCodeAt = this.input.charCodeAt(this.pos + 1);
    var num23 = 1;
    if (charCodeAt === arg) {
      num23 = arg === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
      if (this.input.charCodeAt(this.pos + num23) === 61) {
        return this.finishOp(types$1.assign, num23 + 1);
      }
      return this.finishOp(types$1.bitShift, num23);
    }
    if (charCodeAt === 33 && arg === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45) {
      this.skipLineComment(4);
      this.skipSpace();
      return this.nextToken();
    }
    if (charCodeAt === 61) {
      num23 = 2;
    }
    return this.finishOp(types$1.relational, num23);
  };
  prototype11.readToken_eq_excl = function (arg) {
    var charCodeAt = this.input.charCodeAt(this.pos + 1);
    if (charCodeAt === 61) {
      return this.finishOp(types$1.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2);
    }
    if (arg === 61 && charCodeAt === 62 && this.options.ecmaVersion >= 6) {
      this.pos += 2;
      return this.finishToken(types$1.arrow);
    }
    return this.finishOp(arg === 61 ? types$1.eq : types$1.prefix, 1);
  };
  prototype11.readToken_question = function () {
    var ecmaVersion = this.options.ecmaVersion;
    if (ecmaVersion >= 11) {
      var charCodeAt = this.input.charCodeAt(this.pos + 1);
      if (charCodeAt === 46) {
        var charCodeAt2 = this.input.charCodeAt(this.pos + 2);
        if (charCodeAt2 < 48 || charCodeAt2 > 57) {
          return this.finishOp(types$1.questionDot, 2);
        }
      }
      if (charCodeAt === 63) {
        if (ecmaVersion >= 12) {
          var charCodeAt3 = this.input.charCodeAt(this.pos + 2);
          if (charCodeAt3 === 61) {
            return this.finishOp(types$1.assign, 3);
          }
        }
        return this.finishOp(types$1.coalesce, 2);
      }
    }
    return this.finishOp(types$1.question, 1);
  };
  prototype11.readToken_numberSign = function () {
    var ecmaVersion = this.options.ecmaVersion;
    var num23 = 35;
    if (ecmaVersion >= 13) {
      ++this.pos;
      num23 = this.fullCharCodeAtPos();
      if (isIdentifierStart(num23, true) || num23 === 92) {
        return this.finishToken(types$1.privateId, this.readWord1());
      }
    }
    this.raise(this.pos, "Unexpected character '" + fn8(num23) + "'");
  };
  prototype11.getTokenFromCode = function (arg) {
    switch (arg) {
      case 46:
        return this.readToken_dot();
      case 40:
        ++this.pos;
        return this.finishToken(types$1.parenL);
      case 41:
        ++this.pos;
        return this.finishToken(types$1.parenR);
      case 59:
        ++this.pos;
        return this.finishToken(types$1.semi);
      case 44:
        ++this.pos;
        return this.finishToken(types$1.comma);
      case 91:
        ++this.pos;
        return this.finishToken(types$1.bracketL);
      case 93:
        ++this.pos;
        return this.finishToken(types$1.bracketR);
      case 123:
        ++this.pos;
        return this.finishToken(types$1.braceL);
      case 125:
        ++this.pos;
        return this.finishToken(types$1.braceR);
      case 58:
        ++this.pos;
        return this.finishToken(types$1.colon);
      case 96:
        if (this.options.ecmaVersion < 6) {
          break;
        }
        ++this.pos;
        return this.finishToken(types$1.backQuote);
      case 48:
        var charCodeAt = this.input.charCodeAt(this.pos + 1);
        if (charCodeAt === 120 || charCodeAt === 88) {
          return this.readRadixNumber(16);
        }
        if (this.options.ecmaVersion >= 6) {
          if (charCodeAt === 111 || charCodeAt === 79) {
            return this.readRadixNumber(8);
          }
          if (charCodeAt === 98 || charCodeAt === 66) {
            return this.readRadixNumber(2);
          }
        }
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        return this.readNumber(false);
      case 34:
      case 39:
        return this.readString(arg);
      case 47:
        return this.readToken_slash();
      case 37:
      case 42:
        return this.readToken_mult_modulo_exp(arg);
      case 124:
      case 38:
        return this.readToken_pipe_amp(arg);
      case 94:
        return this.readToken_caret();
      case 43:
      case 45:
        return this.readToken_plus_min(arg);
      case 60:
      case 62:
        return this.readToken_lt_gt(arg);
      case 61:
      case 33:
        return this.readToken_eq_excl(arg);
      case 63:
        return this.readToken_question();
      case 126:
        return this.finishOp(types$1.prefix, 1);
      case 35:
        return this.readToken_numberSign();
    }
    this.raise(this.pos, "Unexpected character '" + fn8(arg) + "'");
  };
  prototype11.finishOp = function (arg, pos) {
    var part = this.input.slice(this.pos, this.pos + pos);
    this.pos += pos;
    return this.finishToken(arg, part);
  };
  prototype11.readRegexp = function () {
    var flag2,
      flag3,
      pos = this.pos;
    for (;;) {
      if (this.pos >= this.input.length) {
        this.raise(pos, "Unterminated regular expression");
      }
      var charAt = this.input.charAt(this.pos);
      if (lineBreak.test(charAt)) {
        this.raise(pos, "Unterminated regular expression");
      }
      if (!flag2) {
        if (charAt === "[") {
          flag3 = true;
        } else if (charAt === "]" && flag3) {
          flag3 = false;
        } else if (charAt === "/" && !flag3) {
          break;
        }
        flag2 = charAt === "\\";
      } else {
        flag2 = false;
      }
      ++this.pos;
    }
    var pattern5 = this.input.slice(pos, this.pos);
    ++this.pos;
    var pos2 = this.pos;
    var flags = this.readWord1();
    if (this.containsEsc) {
      this.unexpected(pos2);
    }
    var fn212 = this.regexpState || (this.regexpState = new fn21(this));
    fn212.reset(pos, pattern5, flags);
    this.validateRegExpFlags(fn212);
    this.validateRegExpPattern(fn212);
    var value = null;
    try {
      value = new RegExp(pattern5, flags);
    } catch (err) {}
    return this.finishToken(types$1.regexp, {
      pattern: pattern5,
      flags,
      value
    });
  };
  prototype11.readInt = function (num23, arg, arg2) {
    var flag2 = this.options.ecmaVersion >= 12 && arg === undefined;
    var flag3 = arg2 && this.input.charCodeAt(this.pos) === 48;
    var pos = this.pos,
      num24 = 0,
      num25 = 0;
    for (var i3 = 0, i4 = arg == null ? Infinity : arg; i3 < i4; ++i3, ++this.pos) {
      var charCodeAt = this.input.charCodeAt(this.pos),
        value = void 0;
      if (flag2 && charCodeAt === 95) {
        if (flag3) {
          this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals");
        }
        if (num25 === 95) {
          this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore");
        }
        if (i3 === 0) {
          this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits");
        }
        num25 = charCodeAt;
        continue;
      }
      if (charCodeAt >= 97) {
        value = charCodeAt - 97 + 10;
      } else if (charCodeAt >= 65) {
        value = charCodeAt - 65 + 10;
      } else if (charCodeAt >= 48 && charCodeAt <= 57) {
        value = charCodeAt - 48;
      } else {
        value = Infinity;
      }
      if (value >= num23) {
        break;
      }
      num25 = charCodeAt;
      num24 = num24 * num23 + value;
    }
    if (flag2 && num25 === 95) {
      this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits");
    }
    if (this.pos === pos || arg != null && this.pos - pos !== arg) {
      return null;
    }
    return num24;
  };
  function fn38(num23, arg) {
    if (arg) {
      return parseInt(num23, 8);
    }
    return parseFloat(num23.replace(/_/g, ""));
  }
  function fn39(text15) {
    if (typeof BigInt !== "function") {
      return null;
    }
    return BigInt(text15.replace(/_/g, ""));
  }
  prototype11.readRadixNumber = function (arg) {
    var pos = this.pos;
    this.pos += 2;
    var int = this.readInt(arg);
    if (int == null) {
      this.raise(this.start + 2, "Expected number in radix " + arg);
    }
    if (this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110) {
      int = fn39(this.input.slice(pos, this.pos));
      ++this.pos;
    } else if (isIdentifierStart(this.fullCharCodeAtPos())) {
      this.raise(this.pos, "Identifier directly after number");
    }
    return this.finishToken(types$1.num, int);
  };
  prototype11.readNumber = function (flag2) {
    var pos = this.pos;
    if (!flag2 && this.readInt(10, undefined, true) === null) {
      this.raise(pos, "Invalid number");
    }
    var flag3 = this.pos - pos >= 2 && this.input.charCodeAt(pos) === 48;
    if (flag3 && this.strict) {
      this.raise(pos, "Invalid number");
    }
    var charCodeAt = this.input.charCodeAt(this.pos);
    if (!flag3 && !flag2 && this.options.ecmaVersion >= 11 && charCodeAt === 110) {
      var result = fn39(this.input.slice(pos, this.pos));
      ++this.pos;
      if (isIdentifierStart(this.fullCharCodeAtPos())) {
        this.raise(this.pos, "Identifier directly after number");
      }
      return this.finishToken(types$1.num, result);
    }
    if (flag3 && /[89]/.test(this.input.slice(pos, this.pos))) {
      flag3 = false;
    }
    if (charCodeAt === 46 && !flag3) {
      ++this.pos;
      this.readInt(10);
      charCodeAt = this.input.charCodeAt(this.pos);
    }
    if ((charCodeAt === 69 || charCodeAt === 101) && !flag3) {
      charCodeAt = this.input.charCodeAt(++this.pos);
      if (charCodeAt === 43 || charCodeAt === 45) {
        ++this.pos;
      }
      if (this.readInt(10) === null) {
        this.raise(pos, "Invalid number");
      }
    }
    if (isIdentifierStart(this.fullCharCodeAtPos())) {
      this.raise(this.pos, "Identifier directly after number");
    }
    var result2 = fn38(this.input.slice(pos, this.pos), flag3);
    return this.finishToken(types$1.num, result2);
  };
  prototype11.readCodePoint = function () {
    var charCodeAt = this.input.charCodeAt(this.pos),
      hexChar;
    if (charCodeAt === 123) {
      if (this.options.ecmaVersion < 6) {
        this.unexpected();
      }
      var num23 = ++this.pos;
      hexChar = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos);
      ++this.pos;
      if (hexChar > 1114111) {
        this.invalidStringToken(num23, "Code point out of bounds");
      }
    } else {
      hexChar = this.readHexChar(4);
    }
    return hexChar;
  };
  prototype11.readString = function (arg) {
    var text15 = "",
      num23 = ++this.pos;
    for (;;) {
      if (this.pos >= this.input.length) {
        this.raise(this.start, "Unterminated string constant");
      }
      var charCodeAt = this.input.charCodeAt(this.pos);
      if (charCodeAt === arg) {
        break;
      }
      if (charCodeAt === 92) {
        text15 += this.input.slice(num23, this.pos);
        text15 += this.readEscapedChar(false);
        num23 = this.pos;
      } else if (charCodeAt === 8232 || charCodeAt === 8233) {
        if (this.options.ecmaVersion < 10) {
          this.raise(this.start, "Unterminated string constant");
        }
        ++this.pos;
        if (this.options.locations) {
          this.curLine++;
          this.lineStart = this.pos;
        }
      } else {
        if (isNewLine(charCodeAt)) {
          this.raise(this.start, "Unterminated string constant");
        }
        ++this.pos;
      }
    }
    text15 += this.input.slice(num23, this.pos++);
    return this.finishToken(types$1.string, text15);
  };
  var obj12 = {};
  prototype11.tryReadTemplateToken = function () {
    this.inTemplateElement = true;
    try {
      this.readTmplToken();
    } catch (err) {
      if (err === obj12) {
        this.readInvalidTemplateToken();
      } else {
        throw err;
      }
    }
    this.inTemplateElement = false;
  };
  prototype11.invalidStringToken = function (arg, arg2) {
    if (this.inTemplateElement && this.options.ecmaVersion >= 9) {
      throw obj12;
    } else {
      this.raise(arg, arg2);
    }
  };
  prototype11.readTmplToken = function () {
    var text15 = "",
      pos = this.pos;
    for (;;) {
      if (this.pos >= this.input.length) {
        this.raise(this.start, "Unterminated template");
      }
      var charCodeAt = this.input.charCodeAt(this.pos);
      if (charCodeAt === 96 || charCodeAt === 36 && this.input.charCodeAt(this.pos + 1) === 123) {
        if (this.pos === this.start && (this.type === types$1.template || this.type === types$1.invalidTemplate)) {
          if (charCodeAt === 36) {
            this.pos += 2;
            return this.finishToken(types$1.dollarBraceL);
          } else {
            ++this.pos;
            return this.finishToken(types$1.backQuote);
          }
        }
        text15 += this.input.slice(pos, this.pos);
        return this.finishToken(types$1.template, text15);
      }
      if (charCodeAt === 92) {
        text15 += this.input.slice(pos, this.pos);
        text15 += this.readEscapedChar(true);
        pos = this.pos;
      } else if (isNewLine(charCodeAt)) {
        text15 += this.input.slice(pos, this.pos);
        ++this.pos;
        switch (charCodeAt) {
          case 13:
            if (this.input.charCodeAt(this.pos) === 10) {
              ++this.pos;
            }
          case 10:
            text15 += "\n";
            break;
          default:
            text15 += String.fromCharCode(charCodeAt);
            break;
        }
        if (this.options.locations) {
          ++this.curLine;
          this.lineStart = this.pos;
        }
        pos = this.pos;
      } else {
        ++this.pos;
      }
    }
  };
  prototype11.readInvalidTemplateToken = function () {
    for (; this.pos < this.input.length; this.pos++) {
      switch (this.input[this.pos]) {
        case "\\":
          ++this.pos;
          break;
        case "$":
          if (this.input[this.pos + 1] !== "{") {
            break;
          }
        case "`":
          return this.finishToken(types$1.invalidTemplate, this.input.slice(this.start, this.pos));
        case "\r":
          if (this.input[this.pos + 1] === "\n") {
            ++this.pos;
          }
        case "\n":
        case "\u2028":
        case "\u2029":
          ++this.curLine;
          this.lineStart = this.pos + 1;
          break;
      }
    }
    this.raise(this.start, "Unterminated template");
  };
  prototype11.readEscapedChar = function (arg) {
    var charCodeAt = this.input.charCodeAt(++this.pos);
    ++this.pos;
    switch (charCodeAt) {
      case 110:
        return "\n";
      case 114:
        return "\r";
      case 120:
        return String.fromCharCode(this.readHexChar(2));
      case 117:
        return fn8(this.readCodePoint());
      case 116:
        return "\t";
      case 98:
        return "\b";
      case 118:
        return "\u000b";
      case 102:
        return "\f";
      case 13:
        if (this.input.charCodeAt(this.pos) === 10) {
          ++this.pos;
        }
      case 10:
        if (this.options.locations) {
          this.lineStart = this.pos;
          ++this.curLine;
        }
        return "";
      case 56:
      case 57:
        if (this.strict) {
          this.invalidStringToken(this.pos - 1, "Invalid escape sequence");
        }
        if (arg) {
          var num23 = this.pos - 1;
          this.invalidStringToken(num23, "Invalid escape sequence in template string");
        }
      default:
        if (charCodeAt >= 48 && charCodeAt <= 55) {
          var item2 = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
          var num24 = parseInt(item2, 8);
          if (num24 > 255) {
            item2 = item2.slice(0, -1);
            num24 = parseInt(item2, 8);
          }
          this.pos += item2.length - 1;
          charCodeAt = this.input.charCodeAt(this.pos);
          if ((item2 !== "0" || charCodeAt === 56 || charCodeAt === 57) && (this.strict || arg)) {
            this.invalidStringToken(this.pos - 1 - item2.length, arg ? "Octal literal in template string" : "Octal literal in strict mode");
          }
          return String.fromCharCode(num24);
        }
        if (isNewLine(charCodeAt)) {
          if (this.options.locations) {
            this.lineStart = this.pos;
            ++this.curLine;
          }
          return "";
        }
        return String.fromCharCode(charCodeAt);
    }
  };
  prototype11.readHexChar = function (arg) {
    var pos = this.pos;
    var int = this.readInt(16, arg);
    if (int === null) {
      this.invalidStringToken(pos, "Bad character escape sequence");
    }
    return int;
  };
  prototype11.readWord1 = function () {
    this.containsEsc = false;
    var text15 = "",
      flag2 = true,
      pos = this.pos;
    var flag3 = this.options.ecmaVersion >= 6;
    while (this.pos < this.input.length) {
      var fullCharCodeAtPos = this.fullCharCodeAtPos();
      if (isIdentifierChar(fullCharCodeAtPos, flag3)) {
        this.pos += fullCharCodeAtPos <= 65535 ? 1 : 2;
      } else if (fullCharCodeAtPos === 92) {
        this.containsEsc = true;
        text15 += this.input.slice(pos, this.pos);
        var pos2 = this.pos;
        if (this.input.charCodeAt(++this.pos) !== 117) {
          this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX");
        }
        ++this.pos;
        var codePoint = this.readCodePoint();
        if (!(flag2 ? isIdentifierStart : isIdentifierChar)(codePoint, flag3)) {
          this.invalidStringToken(pos2, "Invalid Unicode escape");
        }
        text15 += fn8(codePoint);
        pos = this.pos;
      } else {
        break;
      }
      flag2 = false;
    }
    return text15 + this.input.slice(pos, this.pos);
  };
  prototype11.readWord = function () {
    var word1 = this.readWord1();
    var name = types$1.name;
    if (this.keywords.test(word1)) {
      name = keywordTypes[word1];
    }
    return this.finishToken(name, word1);
  };
  var version = "8.12.1";
  Parser.acorn = {
    Parser,
    version,
    defaultOptions,
    Position,
    SourceLocation,
    getLineInfo,
    Node,
    TokenType,
    tokTypes: types$1,
    keywordTypes,
    TokContext,
    tokContexts,
    isIdentifierChar,
    isIdentifierStart,
    Token,
    isNewLine,
    lineBreak,
    lineBreakG,
    nonASCIIwhitespace
  };
  function parse(arg, arg2) {
    return Parser.parse(arg, arg2);
  }
  function parseExpressionAt(arg, arg2, arg3) {
    return Parser.parseExpressionAt(arg, arg2, arg3);
  }
  function tokenizer(arg, arg2) {
    return Parser.tokenizer(arg, arg2);
  }
  exports.Node = Node;
  exports.Parser = Parser;
  exports.Position = Position;
  exports.SourceLocation = SourceLocation;
  exports.TokContext = TokContext;
  exports.Token = Token;
  exports.TokenType = TokenType;
  exports.defaultOptions = defaultOptions;
  exports.getLineInfo = getLineInfo;
  exports.isIdentifierChar = isIdentifierChar;
  exports.isIdentifierStart = isIdentifierStart;
  exports.isNewLine = isNewLine;
  exports.keywordTypes = keywordTypes;
  exports.lineBreak = lineBreak;
  exports.lineBreakG = lineBreakG;
  exports.nonASCIIwhitespace = nonASCIIwhitespace;
  exports.parse = parse;
  exports.parseExpressionAt = parseExpressionAt;
  exports.tokContexts = tokContexts;
  exports.tokTypes = types$1;
  exports.tokenizer = tokenizer;
  exports.version = version;
});
