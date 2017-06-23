(function($) {
	$(document).ready(function() {
		var delay = 0,
		    setTimeoutConst;
		if (navigator.userAgent.indexOf("MSIE") !== -1 || navigator.appVersion.indexOf("Trident/") > 0) {
		} else {
			var headerTopHeight = $(".header-top").outerHeight(),
			    headerHeight = $("header.header.fixed").outerHeight();
			$(window).scroll(function() {
				if (($(".header.fixed").length > 0)) {
					if (($(this).scrollTop() > headerTopHeight + headerHeight) && ($(window).width() > 767)) {
						$("body").addClass("fixed-header-on");
						$(".header.fixed").addClass("animated object-visible fadeInDown");
						if (!($(".header.transparent").length > 0)) {
							if ($(".banner:not(.header-top)").length > 0) {
								$(".banner").css("marginTop", (headerHeight) + "px");
							} else {
								if ($(".page-intro").length > 0) {
									$(".page-intro").css("marginTop", (headerHeight) + "px");
								} else {
									if ($(".page-top").length > 0) {
										$(".page-top").css("marginTop", (headerHeight) + "px");
									} else {
										$("section.main-container").css("marginTop", (headerHeight) + "px");
									}
								}
							}
						}
					} else {
						$("body").removeClass("fixed-header-on");
						$("section.main-container").css("marginTop", (0) + "px");
						$(".banner").css("marginTop", (0) + "px");
						$(".page-intro").css("marginTop", (0) + "px");
						$(".page-top").css("marginTop", (0) + "px");
						$(".header.fixed").removeClass("animated object-visible fadeInDown");
					}
				}
			});
		}
	});
})(this.jQuery);
var lang;
var langLinks = new Array();
langLinks.en = "english-arabic";
langLinks.de = "deutsch-arabisch";
langLinks.fr = "french-arabic";
langLinks.es = "spanish-arabic";
langLinks.it = "italian-arabic";
langLinks.pt = "portuguese-arabic";
langLinks.ar = "عربي-عربي";
langLinks.nl = "dutch-arabic";
langLinks.ru = "russian-arabic";
langLinks.tr = "turkish-arabic";
langLinks.pl = "polish-arabic";
langLinks.zh = "chinese-arabic";
langLinks.ja = "japanese-arabic";
$(function() {
	var searchBox = $("body > .page-wrapper > .main-search-box > #search-box");
	$("input.typeahead").typeahead({
		onSelect : function(item) {
		},
		ajax : {
			url : basePath + "suggest.php?dict=" + subPath + "&limit=20",
			timeout : 10,
			triggerLength : 1,
			method : "get",
			loadingClass : "loading-circle",
			preProcess : function(data) {
				if (data.success === false) {
					return false;
				}
				return data;
			}
		}
	});
	$(searchBox).find("#eingabefeld").focus().select();
	$(searchBox).find("ul li a").click(function(event) {
		var sellectedFlagDict = $(this).find("span").eq(2).attr("class").match(/\w*_f\w*/)[0];
		var sellectedLangText = $(this).find("span").eq(2).text();
		var sellectdeDict = sellectedFlagDict.split("_")[0];
		$(searchBox).find("ul li").removeClass("active");
		$(this).parent().addClass("active");
		$(searchBox).find("#search-field-form input[name=dict]").val(sellectdeDict);
		subPath = sellectdeDict;
		curdict = sellectdeDict;
		var removeDictCl = $(searchBox).find(".ad-language-current span").eq(2).attr("class").match(/\w*_f\w*/)[0];
		$(searchBox).find(".ad-language-current span").eq(3).text(sellectedLangText).prev().removeClass(removeDictCl).addClass(sellectedFlagDict);
		$(searchBox).find(".dropdown-menu").addClass("hide-tmp");
		setTimeout(function() {
			$(searchBox).find(".dropdown-menu").removeClass("hide-tmp");
		}, 1000);
		if ($(searchBox).find("#eingabefeld").val() !== "") {
			$(searchBox).find("#btn-search").trigger("click");
		}
		event.preventDefault();
	});
	var currentSearchTerm = $(searchBox).find("#eingabefeld").val();
	addToSearchHistory(currentSearchTerm);
	$("body > section >.main-box .closeBox").click(function() {
		$(this).parent().slideUp(100).parent().parent().find(".suggestBegriff").css("font-weight", "normal");
	});
	$("body section .main-box .close.fa").click(function(event) {
		$(this).parent().slideUp();
		event.preventDefault();
	});
	$("body > section >.main-box .prevent-default").click(function(event) {
		event.preventDefault();
	});
	if (loggedIn != 1) {
		authenticateDict();
	}
});
function randomString() {
	var chars = "0123456789abcdefghiklmnopqrstuvwxyz";
	var string_length = 10;
	var randomstring = "";
	for (var i = 0; i < string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum, rnum + 1);
	}
	return randomstring;
}

function live_search_focus() {
	$("#eingabefeld").focus();
	$("#eingabefeld").select();
}

function encode(uri) {
	if (encodeURIComponent) {
		return encodeURIComponent(uri).replace(/%2f/ig, "/");
	}
	if (escape) {
		return escape(uri).replace(/%2f/ig, "/");
	}
}

function filter() {
	if (trim($("#categoriesWrapper div").html()) !== "") {
		if ($("#categoriesWrapper").css("display") == "none") {
			$("#categoriesWrapper").slideDown();
		} else {
			$("#categoriesWrapper").slideUp();
		}
	}
}

function updateFilter(curId) {
	if (document.getElementById(curId).checked == 1) {
		$("." + curId).fadeIn("200");
	} else {
		$("." + curId).fadeOut("200");
	}
}

function saveSettings() {
	if ($("#hideAds").is(":checked")) {
		$.cookie("hideAds", 1);
	} else {
		$.cookie("hideAds", 0);
	}
	if ($("input[name=group1]:checked").val() != null) {
	}
	window.location.reload(true);
}

function resetSettings() {
	$.removeCookie("hideAds");
	window.location.reload(true);
}

function changeLang(thisLang, ev) {
	$.cookie("uilang", thisLang);
	var url = document.URL;
	var curUrl = url.replace("/" + uilang + "/", "/" + thisLang + "/");
	location.href = curUrl;
	ev.preventDefault();
}

function trim(zeichenkette) {
	return zeichenkette.replace(/^\s+/, "").replace(/\s+$/, "");
}

function changeDict(suchbegriff, thisDomain) {
	if (suchbegriff == "") {
		window.location = basePath + uilang + "/" + langLinks[thisDomain];
	} else {
		window.location = basePath + uilang + "/" + langLinks[thisDomain] + "/" + encode(trim(suchbegriff));
	}
}

function checklang(str) {
	str = $("#eingabefeld").val();
	str = str.replace(/ |_|\/|\-|=|:|\*|#|\?|=|&|%|$|"|!|'|\+|\.|~|\<|\>|\{|\}|\[|\]|\/|\\|\s|,|`|\)|\(|;|€|«|»|º|§/g, "");
	var arabic_Letters = /ذ|ض|ص|ث|ق|ف|غ|ع|ه|خ|ح|ج|د|ش|س|ي|ب|ل|ا|ت|ن|م|ك|ط|ئ|ء|ؤ|ر|ل|ى|ة|و|ز|ظ|آ|أ|إ/;
	if (arabic_Letters.test(str)) {
		$("#search-box #eingabefeld").addClass("arabic").removeClass("deutsch").parent().parent().find(".typeahead").addClass("arabic").removeClass("deutsch");
		lang = "ar";
	} else {
		$("#search-box #eingabefeld").addClass("deutsch").removeClass("arabic").parent().parent().find(".typeahead").addClass("deutsch").removeClass("arabic");
		lang = "la";
	}
}

function showHint(str, e, der_id) {
	if (navigator.appVersion.indexOf("MSIE 7.") == -1 && navigator.appVersion.indexOf("MSIE 8.") == -1) {
		e.preventDefault();
	}
	var searchtype = $("#search-field-form input[name=dict]").val();
	searchtype;
	var this_id = der_id;
	trim(str);
	checklang(str);
	if (e) {
		e = (!e) ? window.event : e;
		var code = (e.charCode) ? e.charCode : ((e.keyCode) ? e.keyCode : ((e.which) ? e.which : 0));
	} else {
		code = false;
	}
	if (code == 13 || der_id == "btn-search") {
		var url = basePath + uilang + "/" + langLinks[searchtype] + "/" + encode(str);
		window.location = url;
		return false;
	}
}

function melde_beitrag(bei, bei_id, beitrag_vorschlag) {
	var e_mail = "";
	var word_beitrag = "";
	if (beitrag_vorschlag == "" && bei_id == 2) {
		$(".input_error").html('<div class="alert alert-danger">' + addTrans + "</div>").css({
			"font-size" : "15px",
			"font-weight" : "normal"
		}).slideDown();
		return;
	} else {
		if (beitrag_vorschlag == "" && bei_id == 3) {
			document.getElementById("input_error").innerHTML = addEmail;
			return;
		} else {
			if (bei_id == 2) {
				e_mail = "";
				word_beitrag = beitrag_vorschlag;
			}
			if (bei_id == 3) {
				e_mail = beitrag_vorschlag;
				word_beitrag = "";
			}
		}
	}
	var not_allowed = /<|>|#|;|{|}|\(|\)|~|\*|\?|'|\+/;
	if (not_allowed.test(bei)) {
		document.getElementById("suche_abruch_inner").innerHTML = addValidTerm;
		return;
	}
	var params = "beitrag=" + encode(bei) + "&vorschlag=" + encode(word_beitrag) + "&email=" + e_mail + "&sid=" + Math.random();
	var xhr = $.ajax({
		url : basePath + uilang + "/" + subPath + "-ar/beitragmelden",
		global : false,
		type : "POST",
		data : params,
		dataType : "html",
		success : function(msg) {
			if (bei_id == 1) {
				var divTitle = $(".no-result-actions div.input_sent_wishlist").find("h3").text();
				$(".input_sent_wishlist").html("<h3>" + divTitle + '</h3><div class="alert alert-success">' + msg + "</div>");
				$("#beitrag_melden").addClass("disabled");
			} else {
				if (bei_id == 2) {
					$(".input_error").hide(10);
					$(".input_sent_vorsclag").html('<div class="alert alert-success">' + msg + "</div>").css({
						"font-weight" : "normal",
						clear : "both"
					});
					$("#send_beitrag").addClass("disabled");
				} else {
				}
			}
		}
	});
	xhr.onreadystatechange = function() {
		showloadbar(xhr.readyState);
	};
}

function schow_verstecke_beitrag() {
	if (document.getElementById("beitrag_eingabe_div").style.display == "none") {
		$("#beitrag_eingabe_div").slideDown(100);
		document.getElementById("beitrag_vorschlag").innerHTML = deleteTrans;
		document.getElementById("beitrag_eingabe").value = "";
		document.getElementById("beitrag_eingabe").focus();
	} else {
		$("#beitrag_eingabe_div").slideUp(100);
		document.getElementById("beitrag_vorschlag").innerHTML = typeinTrans;
	}
}

function schow_verstecke_beitrag_hover() {
	if (document.getElementById("beitrag_eingabe_div").style.display == "none") {
		$("#beitrag_eingabe_div").slideDown(100);
	}
}

function email_eingabe_div_show() {
	if (document.getElementById("email_eingabe_div").style.display == "none") {
		$("#email_eingabe_div").slideDown(100);
		document.getElementById("beitrag_eingabe_emai").value = "";
		document.getElementById("beitrag_eingabe_emai").focus();
	} else {
		$("#email_eingabe_div").slideUp(100);
	}
}

function deleteTerm(divId) {
	var curclickParams = $("#div_" + divId).parent().parent().find(".fa-pencil").attr("onclick").toString();
	var clickParams = curclickParams.split("show_layer(")[1].split(",");
	var term_id = clickParams[2].replace(/'/g, "");
	var latin_old = clickParams[3].replace(/'/g, "");
	var arabic_old = clickParams[4].replace(/'/g, "");
	arabic_old = arabic_old.replace(/\)/gi, "");
	var delMSG = trim($("#div_" + divId + " .deleteFielsWrapper textarea").val());
	if (delMSG == "") {
		$("#div_" + divId + " .deleteFielsWrapper textarea").css({
			border : "1px solid red"
		});
	} else {
		$("#div_" + divId + " #contribute_status").html("<img src='" + basePath + "images/indicator.gif' border='0' />");
		var params = "term_ar=" + encode(arabic_old) + "&term=" + encode(latin_old) + "&subdict=" + subPath + "&delmsg=" + delMSG + "&termid=" + term_id;
		$.ajax({
			url : basePath + uilang + "/" + subPath + "-ar/sendDeleteNote",
			global : false,
			type : "POST",
			data : params,
			dataType : "html",
			success : function(msg) {
				if (msg == 1) {
					$("#div_" + divId + " #contribute_status").html(ThankForRequest).css({
						color : "green"
					});
					setTimeout(function() {
						$("#div_" + divId + " .popup").parent().slideUp(function() {
							$(this).html("");
							$("#div_" + divId).find(".statusMsg").slideUp(function() {
								$(this).html("");
							});
						});
					}, 3500);
				} else {
				}
			}
		});
	}
}

function correctTerm(id) {
	var latin_new = $("#div_" + id + " .deutsch_").val();
	var arabic_new = $("#div_" + id + " .arabisch_").val();
	var curclickParams = $("#div_" + id).find(".fa-pencil").attr("onclick").toString();
	var clickParams = curclickParams.split("show_layer(")[1].split(",");
	var term_id = clickParams[2].replace(/'/g, "");
	var latin_old = clickParams[3].replace(/'/g, "");
	var arabic_old = clickParams[4].replace(/'/g, "");
	arabic_old = arabic_old.replace(/\)/gi, "");
	if (latin_new == "") {
		$("#div_" + id + " .deutsch_").css("border", "1px solid red");
		return false;
	}
	if (arabic_new == "") {
		$("#div_" + id + " .arabisch_").css("border", "1px solid red");
		return false;
	}
	if (trim(latin_new) == trim(latin_old) && trim(arabic_new) == trim(arabic_old)) {
		$("#div_" + id + " .deutsch_").css("border", "1px solid red");
		$("#div_" + id + " .arabisch_").css("border", "1px solid red");
		return false;
	}
	$("#div_" + id + " .contribute_status").html("<img src='" + basePath + "images/indicator.gif' border='0' />").show();
	$.ajax({
		url : basePath + uilang + "/" + subPath + "-ar/correct_record",
		global : false,
		type : "POST",
		data : "send=1&deut_re=" + encode(latin_new) + "&arab_re=" + encode(arabic_new) + "&subdict=" + subPath + "&termid=" + term_id,
		dataType : "html",
		success : function(msg) {
			$("<div class='statusMsg'>" + msg + "</div>").css("display", "none").insertAfter($("#div_" + id + " .popup")).slideDown();
			setTimeout(function() {
				$("#div_" + id + " .popup").parent().slideUp(function() {
					$(this).html("");
					$("#div_" + id).find(".statusMsg").slideUp(function() {
						$(this).html("");
					});
				});
			}, 5000);
		}
	});
}

function show_comment_box(elem, comment_type, subjId) {
	var parentContainer = $(elem).parent().parent().parent().parent();
	var parentNavi = $(elem).parent().parent().parent();
	if (parentContainer.find(".comment_box").length > 0 && parentContainer.find(".comment_box").css("display") != "none") {
		parentContainer.find(".comment_box").slideUp("100", function() {
			parentContainer.find(".details-arrow").find("a").addClass("fa-caret-right").removeClass("fa-caret-down");
		});
		return false;
	}
	var comment_div = "<div class='comment_box' style='display:none;'><span class='left-blank-bar'></span><span class='editNav'>&nbsp;</span><form action='javascript:void(0)' name='popup_fomular'><div class='comment-title' style='margin-bottom:8px;padding-right:15px;'><a class='fa fa-times pull-right' href='javascript:void(0)' onclick='hideParent($(this).parent().parent())'></a><span class='badge'>add comment</span></div><div style='position:relative;padding-left:10px;overflow:hidden;'><div class='col-xs-12'><textarea placeholder='' class='form-control'></textarea></div><div class='col-xs-12' style='padding:5px;'><input type='submit' onclick=\"sendComment($(this).parent().parent().parent(),'" + comment_type + "'," + subjId + ")\" value='" + sendBtn + "' class='btn btn-warning btn-xs sendcomment' /></div></div></form></div>";
	$(comment_div).insertBefore(parentNavi).slideDown(function() {
		parentContainer.find(".comment_box").css({
			overflow : "visible"
		});
	});
}

function hideParent(elm) {
	$(elm).parent().slideUp();
	if ($(elm).parent().next().hasClass("moreDetailsLink")) {
		$(elm).parent().next().css({
			cursor : "pointer",
			color : ""
		});
	}
}

var lastComment = "";
function sendComment(form, comment_type, subjId) {
	var comment = $(form).find("textarea").val();
	if (comment == "" || lastComment == comment) {
		$(form).find("textarea").css({
			border : "1px solid red"
		});
		return;
	}
	$(form).find("textarea").css({
		border : "1px solid #ccc"
	});
	$(form).css({
		position : "relative"
	}).append('<i class="fa fa-cog fa-spin"></i>').find(".fa-cog").css({
		position : "absolute",
		top : "50%",
		left : "50%",
		"margin-left" : "-7px",
		color : "#58687b",
		"font-size" : "22px",
		"z-index" : "999999"
	});
	$.ajax({
		url : basePath + uilang + "/" + subPath + "-ar/sendcomment",
		global : false,
		type : "POST",
		data : "id=" + encode(subjId) + "&type=" + encode(comment_type) + "&subdict=" + subPath + "&comment=" + encode(comment),
		dataType : "html",
		success : function(msg) {
			$(form).find(".fa-cog").remove();
			if (msg != "1") {
				$('<div><i class="fa fa-thumbs-up" style="color:red"></i></i></div>').insertAfter(form).slideDown();
			} else {
				$('<div style="display:none"><i class="fa fa-thumbs-up" style="color:green;"></i></i></div>').insertAfter(form).slideDown();
				setTimeout(function() {
					$(form).parent().slideUp(function() {
						$(form).parent().remove();
					});
				}, 5000);
			}
		}
	});
}

function closeCommentBox(closeLink) {
	$(closeLink).parent().parent().parent().slideUp();
}

function getComments(elem, comment_type, subjId) {
	var parentContainer = $(elem).parent().parent().parent().parent();
	var parentNavi = $(elem).parent().parent().parent();
	if (parentContainer.find(".comments").length > 0 && parentContainer.find(".comments").css("display") != "none") {
		parentContainer.find(".comments").slideUp("100", function() {
			parentContainer.find(".details-arrow a").addClass("fa-caret-right").removeClass("fa-caret-down");
		});
		return false;
	}
	parentContainer.find(".comments").remove();
	$(elem).parent().css({
		position : "relative"
	}).append('<i class="fa fa-cog fa-spin"></i>').find(".fa-cog").css({
		position : "absolute",
		bottom : "-15px",
		left : "50%",
		color : "#58687b",
		"font-size" : "22px",
		"z-index" : "999999"
	});
	$.ajax({
		url : basePath + uilang + "/" + subPath + "-ar/getcomments",
		global : false,
		type : "POST",
		data : "id=" + encode(subjId) + "&type=" + encode(comment_type) + "&subdict=" + subPath,
		dataType : "html",
		success : function(msg) {
			parentContainer.find(".fa-cog").remove();
			if (msg) {
				$(msg).css({
					display : "none"
				}).insertBefore(parentNavi).slideDown();
			} else {
				var msgid = new Date().getTime();
				$('<div style="display:none;color:red;text-align:center;" class="noComments" id="con_' + msgid + '"><i class="fa fa-meh-o" style="color:red;"></i></i></div>').insertAfter(parentNavi).slideDown();
				setTimeout(function() {
					$("#con_" + msgid).slideUp(function() {
						$("#con_" + msgid).remove();
					});
				}, 5000);
			}
		}
	});
}

function show_layer(obj, ev, xid, deutsch, arabisch) {
	ev.preventDefault();
	if (loggedIn != 1) {
		if ($("#div_" + obj + " .popup").length > 0 && $("#div_" + obj + " .popup").css("display") != "none") {
			$("#div_" + obj).find(".popup").slideUp("fast", function() {
				$("#div_" + obj + " .details-arrow").find("a").addClass("fa-caret-right").removeClass("fa-caret-down");
			});
			return false;
		}
		$("#div_" + obj).find(".popup").remove();
		var correct_div = "<div class='popup' style='margin-left:0px;'><span class='left-blank-bar'></span><span class='editNav'><a href='#' class='openedit' onclick='toggleEditDel(this,event," + obj + ")'>" + editBtn + "</a>&nbsp;&nbsp;<a href='#' class='opendel' onclick='toggleEditDel(this,event," + obj + ")'>" + delBtn + "</a></span><form class='popup_form' action='javascript:void(0)' name='popup_fomular'><div style='margin:8px;padding-right:15px;'><span class='badge'>" + addCorrectHeader + "</span><a class='fa fa-times pull-right' onclick='show_layer(" + obj + ',event,"' + xid + '","' + deutsch + '","' + arabisch + "\")'></a></div><div style='position:relative;'><div class='col-xs-12 deleteFielsWrapper'><textarea placeholder='" + deleteReason + "' class='form-control'></textarea></div><div class='editFielsWrapper'><div class='col-sm-6'><input type='text' name='deutsch' value='" + deutsch + "' class='form-control deutsch_' /></div><div class='col-sm-6'><input type='text' name='arabisch' value='" + arabisch + "' class='form-control arabisch_' dir='rtl' /></div></div><div class='col-xs-12' style='padding:8px;'><a href='javascript:void(0)' onclick='sendDelEdit(" + obj + ")' class='btn btn-warning btn-xs sendVorschlag'>" + sendBtn + "</a><div id='contribute_status'></div></div></div></form></div>";
		if ($("#div_" + obj).find("#edit" + obj).length < 1) {
			$("#div_" + obj).append('<div id="edit' + obj + '" class="editBox" style="overflow:visible"></div>');
		}
		$("#edit" + obj).html(correct_div);
		$("#div_" + obj + " .details-arrow").find("a").addClass("fa-caret-down").removeClass("fa-caret-right");
		$("#div_" + obj + " .deutsch_").val(deutsch);
		$("#div_" + obj + " .arabisch_").val(arabisch);
		$("#edit" + obj).slideDown("fast", function() {
			$(this).find(".left-blank-bar").css("display", "block");
		});
	} else {
		window.location.href = basePath + "team/" + uilang + "/" + subPath + "-ar/edit?action=proofed&term=" + encode(deutsch) + "&id=" + encode(xid);
	}
}

function sendDelEdit(divId) {
	if ($("#div_" + divId + " .editFielsWrapper").is(":visible")) {
		correctTerm(divId);
	} else {
		deleteTerm(divId);
	}
}

function toggleEditDel(delOrEdit, ev, divId) {
	if ($(delOrEdit).attr("class") == "opendel") {
		$("#div_" + divId + " .editFielsWrapper").slideUp();
		$("#div_" + divId + " .deleteFielsWrapper").slideDown();
	} else {
		$("#div_" + divId + " .deleteFielsWrapper").slideUp();
		$("#div_" + divId + " .editFielsWrapper").slideDown();
	}
	ev.preventDefault();
}

function openExternal(link, ev, width, height) {
	var url = link;
	if (width == null) {
		width = 800;
	}
	if (height == null) {
		height = 600;
	}
	var win = window.open(link, "", "width=" + width + "+,height=" + height + ",left=200,top=50, scrollbars=yes, resizable=yes, status=1");
	win.focus();
}

function showinfo(elem, catgory, srctxt, quelle, provider, land, link) {
	var data = "<div class='transInfo'>";
	data += "<a class='fa fa-times pull-right' href='javascript:void(0)' onclick='hideParent($(this).parent())'></a>";
	if (catgory != 0) {
		data += "<span>" + transField + ":</span><span>" + catgory + "</span>,";
	}
	if (srctxt != 0) {
		data += "<span>" + transQuelltext + ":</span><span>" + srctxt + "</span>,";
	}
	if (land != 0) {
		data += "<span>" + transRegion + ":</span><span>" + land + "</span>,";
	}
	if (provider != 0) {
		data += "<span>" + transvon + ":</span><span>" + provider + "</span>,";
	}
	if (quelle != 0) {
		if (link.indexOf("http") != -1) {
		} else {
			link = "http://" + link;
		}
		data += "<span>" + transQuelle + ":</span><span><a href='" + link + "' style='color:blue;'>" + quelle + "</a></span>";
	}
	data += "</div>";
	$(data).insertBefore($(elem).parent().parent().parent()).slideDown();
}

var quizNum = 0;
var quizNumMax = 20;
var optionsLettersLa = {
	1 : "A",
	2 : "B",
	3 : "C",
	4 : "D"
};
var optionsLettersAr = {
	1 : "ا",
	2 : "ب",
	3 : "ج",
	4 : "د"
};
var letterIndex = 0;
var quizRight = [];
var quizWrong = [];
function startQuiz() {
	$(".vtraining").append("<img src='" + basePath + "images/indicator.gif' class='loading' border='0' />").css({
		top : (($(".vtraining").height() - 16) / 2) + "px",
		left : (($(".vtraining").width() - 16) / 2) + "px",
		position : "absolute"
	}).fadeIn(20);
	var params = "lang=" + encode($("#vdirection").val()) + "&fach=" + encode($("#fach").val()) + "&direction=" + encode($("#vdirection").val()) + "&on=&sid=" + Math.random();
	$.ajax({
		url : basePath + uilang + "/" + subPath + "-ar/vtraining",
		global : false,
		type : "POST",
		data : params,
		dataType : "json",
		success : function(data) {
			$(".loading").remove();
			if ($(".content-line .vstart").is(":visible")) {
				$(".content-line .vstart").hide().parent().find(".vstop,.vnext").show();
				$(".panel-heading").slideUp();
			}
			quizNum++;
			updateQuizResult();
			letterIndex = 0;
			var voptions = "";
			var currentOptionsLettersAr = (uilang == "ar") ? optionsLettersAr : optionsLettersLa;
			data.options.forEach(function(entry) {
				letterIndex++;
				if (data.answer == entry) {
					voptions += '<li class="ranswer clickable"><span>' + currentOptionsLettersAr[letterIndex] + "</span>" + entry + "</li>";
				} else {
					voptions += '<li class="wanswer clickable"><span>' + currentOptionsLettersAr[letterIndex] + "</span>" + entry + "</li>";
				}
			});
			$(".vtraining").append('<div class="vtraining-entry item-' + quizNum + '"><div class="title"><span class="badge"> ' + quizNum + " </span> &nbsp; " + data.question + "</div><ul>" + voptions + "</ul></div>").find(".item-" + quizNum + " ul li").on("click", function() {
				$(this).parent().find("li").off("click").removeClass("clickable");
				if ($(this).hasClass("ranswer")) {
					$(this).addClass("alert-success").find("span").css({
						border : "none"
					}).html('<i class="fa fa-check"></i>').parent().parent().parent().find(".title").append(' <i class="fa fa-check"></i>');
					quizRight.push($(this).find(".title").html());
				} else {
					$(this).addClass("alert-danger").find("span").css({
						border : "none"
					}).html('<i class="fa fa-times"></i>').parent().parent().find(".ranswer span").css({
						border : "none"
					}).html('<i class="fa fa-check"></i>').find("i").css({
						color : "green"
					}).parent().parent().parent().parent().find(".title").append(' <i class="fa fa-times"></i>');
					quizWrong.push($(this).find(".title").html());
				}
				updateQuizResult();
			});
		}
	});
}

function updateQuizResult() {
	$(".vcounter").html('<span class="badge alert-default">' + quizNum + "/" + quizNumMax + '</span> - <span class="badge alert-success"><i class="fa fa-check"></i> ' + quizRight.length + "/" + quizNum + '</span> - <span class="badge alert-danger"><i class="fa fa-times"></i> ' + quizWrong.length + "/" + quizNum + "</span>");
}

function clearQuiz() {
	$(".vtraining-entry").slideUp(function() {
		$(".panel-heading").slideDown();
	});
	$(".content-line .vstart").show().parent().find(".vstop,.vnext,.new-quiz").hide();
	quizNum = 0;
	letterIndex = 0;
	quizRight = [];
	quizWrong = [];
	quizNumMax = 20;
	updateQuizResult();
	$("html, body").animate({
		scrollTop : $("#search-box").offset().top
	}, 1500);
}

function endQuiz() {
	quizNumMax = quizNum;
	updateQuizResult();
	$(".content-line .new-quiz").show().parent().find(".vstop,.vnext").hide();
}

function encode_utf8(s) {
	return unescape(encodeURIComponent(s));
}

function getsound(sound, id, lang) {
	if ($("#audios").find("#" + lang + "_" + id).length) {
		$("#" + lang + "_" + id).attr("src", function() {
			return $(this).contents().get(0).location.href;
		});
	} else {
		$.ajax({
			url : basePath + "voice_files/getsound.php?t=" + encode(sound) + "&lg=" + lang,
			global : false,
			type : "GET",
			dataType : "html",
			success : function(data) {
				if (data) {
					var soundSrc = $(data).attr("src");
					var curId = lang + "_" + id;
					$('<iframe src="' + soundSrc + '" frameborder="0" scrolling="no" id="' + curId + '" class="hide-me"></iframe>').appendTo("#audios");
				}
			}
		});
	}
}

function sentplural(row_id, lang, term_id, plur_for, mode) {
	var Plural = $("#plural" + row_id).val();
	if (Plural == "") {
		$("#plural" + row_id).css("border", "1px solid red");
		return false;
	}
	params = "plural=" + encode(Plural) + "&pluralfor=" + encode(plur_for) + "&langua=" + lang + "&rowid=" + term_id + "&mode=" + mode + "&sid=" + Math.random();
	$.ajax({
		url : basePath + uilang + "/" + subPath + "-ar/sendplural",
		global : false,
		type : "POST",
		data : params,
		dataType : "html",
		success : function(msg) {
			if (msg == 1) {
				$("#row" + row_id).fadeOut("200");
			} else {
			}
		}
	});
}

function sendTransVorschlag(row_id, term_id, arabW, latinW) {
	var eingegebenVorschlag = document.getElementById("transVorschlag" + row_id).value;
	if (eingegebenVorschlag == "") {
		document.getElementById("transVorschlag" + row_id).style.border = "1px solid red";
		return false;
	}
	if (arabW == "") {
		arabW = eingegebenVorschlag;
	}
	if (latinW == "") {
		latinW = eingegebenVorschlag;
	}
	$("#row" + row_id).find(".loading").html("<img src='" + basePath + "images/indicator.gif' border='0' />").show().css({
		top : "5px"
	});
	var Transxhr = $.ajax({
		url : basePath + uilang + "/" + subPath + "-ar/sendbeitrag",
		global : false,
		type : "POST",
		data : "send=1&text_deutsch=" + encode(latinW) + "&text_arabisch=" + encode(arabW) + "&indexId=" + term_id + "&sid=" + Math.random(),
		dataType : "html",
		success : function(msg) {
			$("#sendIndicator").remove();
			if (msg == 1) {
				$("#row" + row_id).parent().parent().fadeOut("200", function() {
					$(".wrapperBeitrag > div").removeClass("oddRows");
					$(".wrapperBeitrag > div:visible:odd").addClass("oddRows");
				});
			} else {
				document.getElementById("transVorschlag" + row_id).style.border = "1px solid red";
			}
		}
	});
}

function show_search_tipps() {
	if ($("#contributeDivWrapper").find("#tipps_div").length < 1) {
		$.ajax({
			url : basePath + uilang + "/" + subPath + "-ar/search-tipps",
			global : false,
			type : "GET",
			dataType : "html",
			success : function(msg) {
				$("#contributeDivWrapper").append(msg).find("#tipps_div").slideDown();
			}
		});
	} else {
		if ($("#contributeDivWrapper #tipps_div").is(":visible")) {
			$("#contributeDivWrapper #tipps_div").slideUp();
		} else {
			$("#contributeDivWrapper #tipps_div").slideDown();
		}
	}
}

function showContributeDiv() {
	if ($("#contributeDivWrapper").find("#contribute_Div").length < 1) {
		$.ajax({
			url : basePath + uilang + "/" + subPath + "-ar/contribute-form",
			global : false,
			type : "GET",
			dataType : "html",
			success : function(msg) {
				$("#contributeDivWrapper").append(msg).find("#contribute_Div").slideDown();
			}
		});
	} else {
		if ($("#contributeDivWrapper #contribute_Div").is(":visible")) {
			$("#contributeDivWrapper #contribute_Div").slideUp();
		} else {
			$("#contributeDivWrapper #contribute_Div").slideDown();
		}
	}
}

function sendContribute() {
	addSuggestMsg = addSuggestMsg;
	var arabTerm = $("#beitrag_eingabe_ar").val();
	var latinTerm = $("#beitrag_eingabe_la").val();
	if (arabTerm == "") {
		$("#beitrag_eingabe_ar").css("border", "1px solid red");
		return false;
	}
	if (latinTerm == "") {
		$("#beitrag_eingabe_la").css("border", "1px solid red");
		return false;
	}
	$(".contributeStatus").html("<img src='" + basePath + "images/indicator.gif' border='0' />").show();
	$.ajax({
		url : basePath + uilang + "/" + subPath + "-ar/sendbeitrag",
		global : false,
		type : "POST",
		data : "send=1&text_deutsch=" + encode(latinTerm) + "&text_arabisch=" + encode(arabTerm) + "&sid=" + Math.random(),
		dataType : "html",
		success : function(msg) {
			$(".contributeStatus").html("");
			if (msg == 1) {
				$(".contributeStatus").html(addSuggestMsg);
				setTimeout(function() {
					$(".contributeStatus").html("");
					$("#beitrag_eingabe_la").css("border", "1px solid #ccc").val("");
					$("#beitrag_eingabe_ar").css("border", "1px solid #ccc").val("");
				}, 3000);
			} else {
				$("#beitrag_eingabe_la").css("border", "1px solid red");
				$("#beitrag_eingabe_ar").css("border", "1px solid red");
			}
		}
	});
}

function focus() {
	var name_feld = document.getElementById("namen");
	name_feld.focus();
}

function confirmDelete(delUrl) {
	if (confirm(confirmCommand)) {
		document.location = delUrl;
	}
}

function addtranslation(trans) {
	window.location = basePath + subPath + "-ar/meinbeitrag?" + trans + "#sggestionForm";
}

function loading(loadstate, divId) {
	var loadDiv = "<img src='" + basePath + "images/indicator.gif'/>";
	$("#" + divId + "").html(loadDiv);
	if (loadstate == 4) {
		setTimeout(function() {
			$("#" + divId + "").html("");
		}, 500);
	}
}

function toggleQuestionLang(qaTitle, qaCat, qaTags) {
	$("#qaTitle").val(qaTitle);
	$("#qaCatId").val(qaCat);
	$("#qaTags").val(qaTags);
}

function filterarabicDicts(cat, dict, classnamen, curboxID) {
	if ($("#" + curboxID).is(":checked")) {
		$("div." + classnamen).parent().show().prev().show();
	} else {
		$("div." + classnamen).parent().hide().prev().hide();
	}
}

function filterBooks(classnamen, element) {
	if ($(element).is(":checked")) {
		$(element).parent().parent().parent().next().find("." + classnamen).show();
	} else {
		$(element).parent().parent().parent().next().find("." + classnamen).hide();
	}
}

function toggleDedailsArabic(mehr_id, details_class, spra) {
	if ($("#" + details_class + "").css("display") == "none") {
		$("#" + mehr_id + "").html(" إغلاق");
		$("#" + details_class + "").css("display", "inline");
	} else {
		$("#" + mehr_id + "").html("... المزيد");
		$("#" + details_class + "").css("display", "none");
	}
}

function mehrVorschlagList(listNum, curMainListWrapper) {
	$.ajax({
		url : basePath + uilang + "/" + subPath + "-ar/transneeded?listnum=" + listNum,
		global : false,
		type : "GET",
		dataType : "html",
		success : function(msg) {
			$(".tagsFlag").unbind("click");
			$("#" + curMainListWrapper).hide();
			$("#vorschlagListWrapper_" + (parseInt(listNum) - 1)).append(msg);
			$("#vorschlagListWrapper_" + listNum).slideDown();
			$(".wrapperBeitrag > div:odd").addClass("oddRows");
		}
	});
}

function registerRecordRevision(latinTerm, termId, actionId) {
	$.ajax({
		url : basePath + uilang + "/" + subPath + "-ar/registerrevision?term=" + encode(latinTerm) + "&termid=" + termId + "&action=" + actionId,
		global : false,
		type : "GET",
		dataType : "html",
		success : function(msg) {
			if (actionId == 1) {
				$("#meldungWrapper").html(msg).css({
					color : "green"
				});
				$("#right_btn").addClass("disabled").attr("onclick", "");
				$("#wrong_btn").addClass("disabled").attr("onclick", "");
				$("#skip_btn").addClass("disabled").attr("href", "javascript: void(0)");
				$("#next_btn").show();
			} else {
				if (actionId == 2) {
					$("#meldungWrapper").html(msg).css({
						color : "red"
					});
					$("#right_btn").addClass("disabled").attr("onclick", "");
					$("#wrong_btn").addClass("disabled").attr("onclick", "");
					$("#skip_btn").addClass("disabled").attr("href", "javascript: void(0)");
					$("#next_btn").show();
				} else {
				}
			}
		}
	});
}

function handleLogIn(ev, url, type) {
	if (type == "register") {
		url = url + window.location.href;
	}
	if (url.match("to=$")) {
		url = url + window.location.href;
	}
	window.location.href = url;
	ev.preventDefault();
}

function sentpluraladmin(row_id, lang, term_id, plur_for, vorschlag_id, mode) {
	var Plural = $("#plural" + row_id).val();
	if (Plural == "") {
		$("#plural" + row_id).css("border", "1px solid red");
		return false;
	}
	params = "plural=" + encode(Plural) + "&pluralfor=" + encode(plur_for) + "&langua=" + lang + "&rowid=" + term_id + "&mode=" + mode + "&vorschlag_id=" + vorschlag_id + "&sid=" + Math.random();
	$.ajax({
		url : basePath + uilang + "/" + subPath + "-ar/insertplural",
		global : false,
		type : "POST",
		data : params,
		dataType : "html",
		success : function(msg) {
			if (msg == 1) {
				$("#row" + row_id).fadeOut("200");
			} else {
			}
		}
	});
}

function setResultOrder(id, type, up_down, elem) {
	var parentContainer = $(elem).parent().parent().parent().parent();
	var parentNavi = $(elem).parent().parent().parent();
	params = "tab=" + type + "&id=" + id + "&updown=" + up_down + "&sid=" + Math.random();
	$(elem).parent().css({
		position : "relative"
	}).append('<i class="fa fa-cog fa-spin"></i>').find(".fa-cog").css({
		position : "absolute",
		bottom : "-15px",
		color : "#58687b",
		"font-size" : "22px",
		"z-index" : "999999"
	});
	$.ajax({
		url : basePath + uilang + "/" + subPath + "-ar/resultorder",
		global : false,
		type : "POST",
		data : params,
		dataType : "html",
		success : function(msg) {
			var msgid = new Date().getTime();
			$(elem).parent().find(".fa-cog").remove();
			if (msg) {
				$('<div style="display:none" id="con_' + msgid + '" class="resultOrder"><i class="fa fa-thumbs-up" style="color:green;"></i></i></div>').css({
					display : "none"
				}).insertBefore(parentNavi).slideDown();
				setTimeout(function() {
					$("#con_" + msgid).slideUp(function() {
						$("#con_" + msgid).remove();
					});
				}, 5000);
			} else {
				$('<div style="display:none" class="resultOrder"><i class="fa fa-thumbs-up" style="color:red;"></i></i></div>').css({
					display : "none"
				}).insertBefore(parentNavi).slideDown();
				setTimeout(function() {
					$("#con_" + msgid).slideUp(function() {
						$("#con_" + msgid).remove();
					});
				}, 5000);
			}
		}
	});
}

function addDetails(elem, section, latin, arabic, id, type, term) {
	var milliseconds = new Date().getTime();
	if ($(elem).prev().attr("class") == "addDetails" && $(elem).prev().css("display") == "block") {
		return false;
	}
	$(elem).parent().find(".addDetails").slideUp().remove();
	$(elem).parent().find(".addDetails").remove();
	var addDetailsBox = "<div class='addDetails' id='addDetaitls_" + milliseconds + "' style='display:none;'><form action='javascript:void(0)' name='popup_fomular'><div class='comment-title' style='margin-bottom:8px;padding-right:15px;'><a class='fa fa-times pull-right' href='javascript:void(0)' onclick='hideParent($(this).parent().parent())'></a><span class='badge'>" + section + "</span></div><div style='position:relative;padding-left:10px;'><div class='row'><div class='col-sm-6'><label>" + latin + "</label><textarea id='latin_" + milliseconds + "' class='form-control'></textarea></div><div class='col-sm-6'><label>" + arabic + "</label><textarea id='arabic_" + milliseconds + "' class='form-control details_eingabe_ar'></textarea></div></div><div class='editFielsWrapper'><div class='col-xs-12'><input type='submit' onclick=\"sendDetails(" + milliseconds + ",'" + type + "'," + id + ",'" + term + "')\" value='" + sendBtn + "' class='btn btn-warning btn-xs sendcomment' /><div id='contribute_status'></div></div></div></form></div>";
	$(addDetailsBox).insertBefore($(elem)).slideDown().next().addClass("disabled");
	$(elem).css({
		cursor : "default",
		color : "#ccc"
	});
}

function sendDetails(idSufix, type, id, term) {
	var detailsBox = $("#addDetaitls_" + idSufix).val();
	var latin = $("#latin_" + idSufix).val();
	var arabic = $("#arabic_" + idSufix).val();
	if (latin == "") {
		$("#latin_" + idSufix).css("border", "1px solid red");
		return false;
	} else {
		$("#latin_" + idSufix).css("border", "1px solid #ccc");
	}
	if (arabic == "") {
		$("#arabic_" + idSufix).css("border", "1px solid red");
		return false;
	} else {
		$("#arabic_" + idSufix).css("border", "1px solid ccc");
	}
	$("#addDetaitls_" + idSufix).css({
		position : "relative"
	}).append('<i class="fa fa-cog fa-spin"></i>').find(".fa-cog").css({
		position : "absolute",
		bottom : "-15px",
		color : "#58687b",
		"font-size" : "22px",
		"z-index" : "999999"
	});
	params = "arabic=" + arabic + "&latin=" + latin + "&id=" + id + "&type=" + type + "&term=" + term + "&sid=" + Math.random();
	$.ajax({
		url : basePath + uilang + "/" + subPath + "-ar/sendterm-details",
		global : false,
		type : "POST",
		data : params,
		dataType : "html",
		success : function(msg) {
			$("#addDetaitls_" + idSufix).find(".fa-cog").remove();
			$("#addDetaitls_" + idSufix).append('<div style="display:none" id="con_' + idSufix + '" class="resultOrder"><i class="fa fa-thumbs-up" style="color:green;"></i></i></div>').find("#con_" + idSufix).slideDown();
			setTimeout(function() {
				$("#addDetaitls_" + idSufix).slideUp(function() {
					$("#addDetaitls_" + idSufix).remove();
				});
				$("#addDetaitls_" + idSufix).next().css({
					cursor : "pointer",
					color : ""
				});
			}, 4000);
		}
	});
}

function getInfoTab(elmId) {
	if ($("#" + elmId).find(".infoTab").length < 1) {
		var detailsUrl = $("#" + elmId).find("a.fa-caret-right").attr("href");
		var term = getParameterByName("term", detailsUrl);
		var termId = getParameterByName("ids", detailsUrl);
		var flagElm = $("#" + elmId).find(".fa-warning").attr("href");
		var checkWarnung = (flagElm) ? '<li> <a href="' + $("#" + elmId).find(".fa-warning").attr("href") + '" class="info" title=""> <i class="fa fa-check"> </i>&nbsp;</a> </li>' : "";
		var infoList = '<ul><li><a href="' + detailsUrl + '" class="info"> <span>examples & more</span> <i class="fa fa-bars"></i></a></li>' + checkWarnung + '<li><a href="javascript: void(0)" onclick="show_comment_box(this,1,' + termId + ')" class="info hidden-xs" title="add&nbsp;comment"> <span>add</span> <i class="fa fa-comment">&nbsp; </i></a> </li><li><a href="javascript: void(0)" onclick="getComments(this,1,' + termId + ')" class="info hidden-xs" title="show&nbsp;comment"> <span>show</span> <i class="fa fa-comments">&nbsp; </i> </a></li><li><a href="javascript: void(0)" onclick="addToFavoriteListe(event,this)" class="info" title="' + Favoritenlist + '"> <i class="fa fa-star">&nbsp; </i> </a></li> </ul>';
		$("#" + elmId).append('<div class="infoTab"></div>');
		$("#" + elmId).find(".infoTab").html(infoList);
	}
}

function getParameterByName(name, url) {
	if (!url) {
		url = location.href;
	}
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(url);
	return results == null ? null : results[1];
}

function checkTermExistence(la, ar, dict, src) {
	$("#term-status-" + src).html('<i class="fa fa-spinner fa-pulse pull-left"></i>');
	params = "arabic=" + ar + "&latin=" + la + "&dict=" + dict + "&src=" + src + "&sid=" + Math.random();
	$.ajax({
		url : basePath + uilang + "/" + subPath + "-ar/check-term-existence?term=" + encode(ar + la),
		global : false,
		type : "POST",
		data : params,
		dataType : "html",
		success : function(msg) {
			$("#term-status-" + src).html("").append(msg);
		}
	});
}

function savePdf(term, mode, checksum) {
	if (mode == "print") {
		var printWindow = window.open(basePath + uilang + "/" + subPath + "-ar/save-pdf?q=" + encode(term) + "&mode=" + mode + "&checksum=" + checksum, term, "menubar=1,resizable=1,width=750,height=350");
		printWindow.focus();
		printWindow.print();
	} else {
		location.href = basePath + uilang + "/" + subPath + "-ar/save-pdf?q=" + encode(term) + "&mode=" + mode + "&checksum=" + checksum;
	}
}

function addToFavoriteList(elem, term, id) {
	var parentContainer = $(elem).parent().parent().parent().parent();
	var parentNavi = $(elem).parent().parent().parent();
	params = "term=" + term + "&id=" + id + "&sid=" + Math.random();
	$(elem).parent().css({
		position : "relative"
	}).append('<i class="fa fa-cog fa-spin"></i>').find(".fa-cog").css({
		position : "absolute",
		bottom : "-15px",
		color : "#58687b",
		"font-size" : "22px",
		"z-index" : "999999"
	});
	$.ajax({
		url : basePath + uilang + "/" + subPath + "-ar/add-to-favorite",
		global : false,
		type : "POST",
		data : params,
		dataType : "html",
		success : function(msg) {
			var msgid = new Date().getTime();
			$(elem).parent().find(".fa-cog").remove();
			if (msg) {
				$('<div style="display:none" id="con_' + msgid + '" class="resultOrder"><i class="fa fa-thumbs-up" style="color:green;"></i></i></div>').css({
					display : "none"
				}).insertBefore(parentNavi).slideDown();
				setTimeout(function() {
					$("#con_" + msgid).slideUp(function() {
						$("#con_" + msgid).remove();
					});
				}, 5000);
			} else {
				$('<div style="display:none" class="resultOrder"><i class="fa fa-thumbs-up" style="color:red;"></i></i></div>').css({
					display : "none"
				}).insertBefore(parentNavi).slideDown();
				setTimeout(function() {
					$("#con_" + msgid).slideUp(function() {
						$("#con_" + msgid).remove();
					});
				}, 5000);
			}
		}
	});
}

function deleteFavorite(elem, term, id) {
	if (confirm(confirmCommand)) {
		params = "term=" + term + "&id=" + id + "&sid=" + Math.random();
		$(elem).parent().css({
			position : "relative"
		}).append('<i class="fa fa-cog fa-spin"></i>').find(".fa-cog").css({
			position : "absolute",
			bottom : "-15px",
			color : "#58687b",
			"font-size" : "20px",
			"z-index" : "999999"
		});
		$.ajax({
			url : basePath + uilang + "/" + subPath + "-ar/delete-from-favorite",
			global : false,
			type : "POST",
			data : params,
			dataType : "html",
			success : function(msg) {
				location.reload();
			}
		});
	}
}

function correctExamples(num, event, id, elm) {
	var hauptElm = $(elm).parent().parent().parent().parent();
	var latin = $(hauptElm).find("div.latin").text();
	var arabic = $(hauptElm).find("div.arabic").text();
	if ($(hauptElm).find("div.editExample").is(":visible")) {
		$(hauptElm).find("div.editExample").slideUp();
	} else {
		$(hauptElm).find("div.editExample").css({
			display : "none"
		});
		var exampleEditForm = '<div><div class="col-sm-6"><textarea class="form-control latin">' + latin + '</textarea></div><div class="col-sm-6"><textarea class="form-control arabic">' + arabic + '</textarea></div></div><div class="col-xs-12"><a class="btn btn-warning btn-xs" onclick="sendCorrectedExample(this,' + id + ')" href="javascript:void(0)">Senden</a></div>';
		$(hauptElm).find("div.editExample").html(exampleEditForm).slideDown();
	}
}

function sendCorrectedExample(elm, id) {
	var arabicCorrected = $(elm).parent().prev().find("textarea.arabic").val();
	var latinCorrected = $(elm).parent().prev().find("textarea.latin").val();
	var hauptElm = $(elm).parent().parent().parent();
	var latinOld = $(hauptElm).find("div.latin").text();
	var arabicOld = $(hauptElm).find("div.arabic").text();
	if (trim(latinOld) === trim(latinCorrected) && trim(arabicOld) === trim(arabicCorrected)) {
		$(elm).parent().prev().find("textarea").css({
			border : "1px solid red"
		});
	} else {
		params = "arabic=" + arabicCorrected + "&latin=" + latinCorrected + "&latino=" + latinOld + "&arabico=" + arabicOld + "&id=" + id;
		$(elm).parent().css({
			position : "relative"
		}).append('&nbsp;&nbsp;<i class="fa fa-cog fa-spin"></i>').find(".fa-cog").css({
			position : "absolute",
			bottom : "0px",
			color : "#58687b",
			"font-size" : "20px",
			"z-index" : "999999"
		});
		$.ajax({
			url : basePath + uilang + "/" + subPath + "-ar/correct-example",
			global : false,
			type : "POST",
			data : params,
			dataType : "html",
			success : function(msg) {
				if (msg == 0) {
					$(elm).parent().prev().find("textarea").css({
						border : "1px solid red"
					});
				} else {
					$(elm).parent().find(".fa-cog").removeClass("fa-cog").removeClass("fa-spin").addClass("fa-thumbs-up").css({
						position : "absolute",
						bottom : "0px",
						color : "green",
						"font-size" : "20px",
						"z-index" : "999999"
					});
					setTimeout(function() {
						$(elm).parent().parent().parent().parent().find("div.editExample").slideUp(function() {
						});
					}, 5000);
				}
			}
		});
	}
}

function authenticateDict() {
	var loginWrapper = $("body div.login-wrapper");
	if (!$.cookie("qa_session") && loginWrapper.hasClass("login-wrapper-updated") === false) {
		loginWrapper.addClass("login-wrapper-updated").find("form.login-form").prepend('<div class="fa fa-spinner fa-spin"></div>');
		loginWrapper.find("button").one("click", function() {
			authenticateDict();
		});
		return;
	}
	params = "footer=1&nav=1";
	$.ajax({
		url : basePath + "team/" + uilang + "/" + subPath + "-ar/authenticate",
		global : false,
		data : params,
		type : "POST",
		dataType : "html",
		success : function(msg) {
			if (msg) {
				loggedIn = 1;
				msgObj = JSON.parse(msg);
				if (msgObj.hasOwnProperty("navheader")) {
					$("body .header-top .login-wrapper").html(msgObj.navheader);
				}
				if (msgObj.hasOwnProperty("navfooter")) {
					$("body footer .aralnks").prepend(msgObj.navfooter);
				}
				if (msgObj.hasOwnProperty("logInForm")) {
					loginWrapper.find(".fa-spinner").remove();
					loginWrapper.find("form.login-form").attr("action", loginWrapper.find("form.login-form").attr("action") + document.URL).prepend(msgObj.logInForm).find(".login-btn").hide();
				}
			}
		}
	});
}

function getTransInfo(transInfoId, elm) {
	if ($(elm).hasClass("with-title")) {
	} else {
		$(elm).attr("title", "...").addClass("with-title");
		params = "infoId=" + transInfoId;
		$.ajax({
			url : basePath + uilang + "/" + subPath + "-ar/translation-info",
			global : false,
			data : params,
			type : "POST",
			dataType : "html",
			success : function(msg) {
				if (msg) {
					$(elm).attr("title", msg).off("mouseover").tooltip().trigger("mouseover");
				}
			}
		});
	}
}

function showHistory(dict) {
	var historyCon = $("#historyWrapper");
	if (historyCon.html() != "" && historyCon.is(":visible")) {
		historyCon.slideUp();
		return;
	}
	if (historyCon.html() != "" && !historyCon.is(":visible")) {
		historyCon.slideDown();
		return;
	}
	if (window.localStorage) {
		try {
			var searchHistory = JSON.parse(localStorage.getItem("searchHistory_" + dict)) || [];
			var history = "";
			searchHistory.forEach(function(searchHistoryElemnt) {
				if (searchHistoryElemnt != "") {
					var searchUrl = basePath + uilang + "/" + langLinks[subPath] + "/" + encode(searchHistoryElemnt);
					history += '<li><a href="' + searchUrl + '">' + searchHistoryElemnt + "</a></li>";
				}
			});
			$("#historyWrapper").html("<ul>" + history + "</ul>").slideDown();
		} catch(err) {
		}
	}
}

function addToFavoriteListe(e, elm) {
	e.preventDefault();
	e.stopPropagation();
	if (window.localStorage) {
		try {
			var pairContainer = $(elm).parent().parent().parent().parent();
			var arabic = pairContainer.find(".arabic-term").text();
			var latin = pairContainer.find(".latin-term").text();
			var article = "";
			if (pairContainer.find(".latin-term").prev().hasClass("article")) {
				article = pairContainer.find(".latin-term").prev().text();
			}
			var favoriteList = JSON.parse(localStorage.getItem("favoriteList_" + curdict)) || [];
			if ( favoriteList instanceof Array === false) {
				favoriteList = [];
			}
			if (arabic && latin) {
				var tmp_array = [latin, arabic, article];
				favoriteList.push(tmp_array);
				favoriteList = favoriteList.slice(0, 250);
				localStorage.setItem("favoriteList_" + curdict, JSON.stringify(favoriteList));
				$(elm).hide();
			}
		} catch(err) {
		}
	}
}

function addToSearchHistory(searchTerm) {
	if (window.localStorage) {
		var searchHistory = JSON.parse(localStorage.getItem("searchHistory_" + curdict)) || [];
		if (searchTerm != "") {
			if (searchHistory.indexOf(searchTerm) == "-1") {
				searchHistory.unshift(searchTerm);
				searchHistory = searchHistory.slice(0, 20);
				localStorage.setItem("searchHistory_" + curdict, JSON.stringify(searchHistory));
			}
		}
	}
}

function getFavoriteListe(dict) {
	if (window.localStorage) {
		try {
			var favoriteList = JSON.parse(localStorage.getItem("favoriteList_" + dict)) || [];
			var favorites = "";
			var index = 0;
			if ( favoriteList instanceof Array != false && favoriteList.length > 0) {
				favoriteList.forEach(function(listElement) {
					if (listElement) {
						var article = ( typeof listElement[2] !== "undefined") ? listElement[2] : "";
						favorites += '<li><span><a href="#" onclick="removeFromFavorite(event,this,' + index + ')" class="deleteIcon")> <i class="fa fa-times"/> </a></span> <span class="article">' + article + '</span> <span class="latin">' + listElement[0] + ' </span><span class="arabic"> ' + listElement[1] + "</span></li>";
						index++;
					}
				});
			} else {
				favoriteList = [];
			}
			$("#searchFavorites").html("<ul>" + favorites + "</ul>");
		} catch(err) {
		}
	}
}

function removeFromFavorite(e, elem, index) {
	e.preventDefault();
	e.stopPropagation();
	if (window.localStorage) {
		try {
			var favoriteList = JSON.parse(localStorage.getItem("favoriteList_" + curdict)) || [];
			if ( favoriteList instanceof Array != false) {
				favoriteList.splice(index, 1);
				localStorage.setItem("favoriteList_" + curdict, JSON.stringify(favoriteList));
			}
		} catch(err) {
		}
		window.location.href = window.location.href;
	}
}

function toggleNoresult(divId, elm) {
	if (divId == "input_sent_wishlist") {
		melde_beitrag(document.getElementById("eingabefeld").value, 1, 1);
	}
	$(elm).parent().remove();
	$(".no-result-opts").append('<div class="col-sm-3"></div>');
	var currElem = $(".no-result-actions > div." + divId);
	$(".no-result-actions > div." + divId).remove();
	$(".no-result-actions").prepend(currElem).find("." + divId).show();
	var elmClass = $(elm).attr("class");
	$("<div><span></span></div>").insertBefore($(".no-result-actions > div." + divId)).show().css({
		"background-color" : "#fff",
		padding : "0px"
	}).find("span").css({
		"background-color" : "#f1f1f1",
		"border-radius" : "2px",
		display : "inline-block"
	}).addClass(elmClass);
}

function translateText(evalTrans) {
	var langOne = $("#trans-service-one-lang").val();
	var langTwo = $("#trans-service-two-lang").val();
	var textOne = $("#trans-service-one-box").val();
	if (evalTrans == "eval") {
		var textTwo = $("#trans-service-two-box").text();
		var params = "&texttwo=" + textTwo + "&eval=up";
	} else {
		if (textOne.trim() == "") {
			$("#trans-service-one-box").css({
				"border-color" : "red"
			});
			return;
		} else {
			$("#trans-service-one-box").css({
				"border-color" : "#ccc"
			});
		}
		var params = "";
	}
	$.ajax({
		url : basePath + uilang + "/" + subPath + "-ar/stranslate?langone=" + langOne + "&langtwo=" + langTwo + "&textone=" + textOne + params,
		global : false,
		type : "GET",
		dataType : "html",
		beforeSend : function() {
			$("#text-translation").find(".fa-spinner").css({
				display : "inline-block"
			});
		},
		success : function(msg) {
			if (evalTrans != "eval") {
				$("#trans-service-two-box").prev().css({
					display : "block"
				}).next().html(msg).show();
			}
			$("#text-translation").find(".fa-spinner").css({
				display : "none"
			});
		}
	});
}

function selectTranMaschineLang(dir, elmId) {
	var curList = $(".trans-service-" + dir).html("");
	var langList = "";
	$("ul.ad-language-select li").each(function(index, element) {
		var curLangName = $(this).find("a span:last-child").text();
		var curLangId = $(this).find("a span:last-child").attr("id");
		curLangId = curLangId.replace(/_/g, "");
		if (elmId != curLangId) {
			langList += "<li><a onclick=\"selectTranMaschineLang('" + dir + "','" + curLangId + '\')" href="javascript:void(0)" class="' + curLangId + '"><span class="ad-language-flag ' + curLangId + '_f">' + curLangName + "</span></a></li>";
		} else {
			$("#trans-service-" + dir + "-Label").find(".ad-language-flag").attr("class", "ad-language-flag " + curLangId + "_f").text(curLangName);
			$("#trans-service-" + dir + "-lang").val(curLangId);
			if (curLangId == "ar") {
				$("#trans-service-" + dir + "-box").css({
					"text-align" : "right"
				});
			} else {
				$("#trans-service-" + dir + "-box").css({
					"text-align" : "left"
				});
			}
		}
	});
	curList.html(langList);
}

function evaluateTextTrans(type, elm) {
	if (type == "up") {
		translateText("eval");
	}
	$(elm).css({
		visibility : "hidden"
	});
}

function sendthisbeitrag() {
	$("#fehler_message").html("");
	var namen = $("#name_").val();
	var emails = $("#email_").val();
	var beitrag_deutsch = $("#beitrag_deutsch").val();
	var beitrag_arabisch = $("#beitrag_arabisch").val();
	var fehlern = "";
	if (emails != "") {
		var pattern = /^([a-zA-Z0-9])+([\.a-zA-Z0-9_-])*@([a-zA-Z0-9])+(\.[a-zA-Z0-9_-]+)+$/;
		if (pattern.test(emails)) {
			var emails = emails;
			$("#email_").css("border", "1px solid #cccccc");
		} else {
			$("#email_").css("border", "1px solid red");
			$("#fehler_message").append("<div class='errormsg'>" + validEmail + "</div>");
		}
	}
	if (beitrag_deutsch != "") {
		$("#beitrag_deutsch").css("border", "1px solid #bbbbbb");
	} else {
		fehlern = "x";
		$("#beitrag_deutsch").css("border", "1px solid red");
		if ($("#fehler_message_de")) {
			$("#fehler_message_de").css("display", "none").html("<div class='errormsg'>" + addLatinBeitrag + "</div>").fadeIn();
		}
		if ($("#fehler_message")) {
			$("#fehler_message").append("<div class='errormsg'>" + addLatinBeitrag + "</div>");
		}
	}
	if (beitrag_arabisch != "") {
		var deutsch_letters = /^[a-züßäö:\/\\\<\>\{\}\[\];*#?=&%$"!'+.~A-ZÜÄÖ0-9\s(\-)]{0,}$/;
		$("#beitrag_arabisch").css("border", "1px solid #bbbbbb");
	} else {
		fehlern = "x";
		$("#beitrag_arabisch").css("border", "1px solid red");
		if ($("#fehler_message_ar")) {
			$("#fehler_message_ar").css("display", "none").html("<div class='errormsg'>" + addArabicBeitrag + "</div>").fadeIn();
		}
		if ($("#fehler_message")) {
			$("#fehler_message").append("<div class='errormsg'>" + addArabicBeitrag + "</div>");
		}
	}
	if (fehlern == "") {
		$("#loadWert").html("<img src='" + basePath + "images/indicator.gif' border='0' />").show();
		var xhr = $.ajax({
			url : basePath + uilang + "/" + subPath + "-ar/sendbeitrag",
			global : false,
			type : "POST",
			data : "send=1&beitrager=" + namen + "&email=" + emails + "&text_deutsch=" + beitrag_deutsch + "&text_arabisch=" + beitrag_arabisch + "&indexId=" + vorschlagIndexNum,
			dataType : "html",
			success : function(msg) {
				if (msg == 1) {
					if (document.getElementById("fehler_message")) {
						$("#fehler_message").append("<div style='font-size:14px;margin:2px;color:green;font-weight:bold;'>" + thanksforBeitrag + "</div>");
						show_inhalt_close_div();
						$("textarea").val("");
					} else {
						$("#success_meldung").css("display", "none").html("<div style='margin:2px;color:green;font-weight:bold;font-size:14px;'>" + thanksforBeitrag + "</div>").fadeIn();
						$("#fehler_message_ar").fadeOut().html("");
						$("#fehler_message_de").fadeOut().html("");
						$(".vorschlagRowInner").find($("#" + trim(curVorschlgId))).remove();
						$("#" + trim(curVorschlgId)).remove();
						setTimeout(function() {
							$("#success_meldung").fadeOut();
							$("#beitrag_deutsch").val("");
							$("#beitrag_arabisch").val("");
						}, 5000);
						$("textarea").val("");
					}
				} else {
					$("#fehler_message").append(msg);
					show_inhalt_close_div();
				}
				$("#loadWert").html("");
			}
		});
	} else {
		show_inhalt_close_div();
	}
}

function show_inhalt_close_div() {
	$("#fehler_message_ar").show();
	$("#fehler_message_de").show();
	$("#fehler_message").show();
	setTimeout(function() {
		$("#fehler_message").slideUp();
		$("#fehler_message").html("");
		$("#success_meldung").hide().html("");
	}, 5000);
}

function sendthisemail() {
	var namen = $("#name").val();
	var emails = $("#email_").val();
	var subj = $("#subj").val();
	var mesg = $("#mesg").val();
	var fehlern = "";
	if (namen != "") {
		var namen = namen;
		$("#name").css("border", "1px solid #cccccc");
	} else {
		fehlern = "x";
		$("#name").css("border", "1px solid red");
		$("#fehler_message").append("<div style='margin:2px;color:red;'>" + addName + "</div>");
	}
	if (emails != "") {
		var pattern = /^([a-zA-Z0-9])+([\.a-zA-Z0-9_-])*@([a-zA-Z0-9\-])+(\.[a-zA-Z0-9_-]+)+$/;
		if (pattern.test(emails)) {
			var emails = emails;
			$("#email_").css("border", "1px solid #cccccc");
		} else {
			fehlern = "x";
			$("#email_").css("border", "1px solid red");
			$("#fehler_message").append("<div style='margin:2px;color:red;'>" + validEmail + "</div>");
		}
	} else {
		fehlern = "x";
		$("#email_").css("border", "1px solid red");
		$("#fehler_message").append("<div style='margin:2px;color:red;'>" + addEmail + "</div>");
	}
	if (subj != "") {
		var subj = subj;
		$("#subj").css("border", "1px solid #cccccc");
	} else {
		fehlern = "x";
		$("#subj").css("border", "1px solid red");
		$("#fehler_message").append("<div style='margin:2px;color:red;'>" + addSubj + "</div>");
	}
	if (mesg != "") {
		var mesg = mesg;
		$("#mesg").css("border", "1px solid #bbbbbb");
	} else {
		fehlern = "x";
		$("#mesg").css("border", "1px solid red");
		$("#fehler_message").append("<div style='margin:2px;color:red;'>" + addMSG + "</div>");
	}
	if (fehlern == "") {
		$.ajax({
			url : basePath + uilang + "/" + subPath + "-ar/sendmail",
			global : false,
			type : "POST",
			data : "send=1&name=" + namen + "&email=" + emails + "&subject=" + subj + "&text=" + mesg,
			dataType : "html",
			success : function(msg) {
				if (msg == 1) {
					$("#fehler_message").append("<div class='alert alert-success'>" + thanksforMail + "</div>");
					show_inhalt_close_div();
					$("textarea").val("");
					$(":input:[type=text]").val("");
				} else {
					$("#fehler_message").append(msg);
					$("#fehler_message").slideDown();
					setTimeout(function() {
						$("#fehler_message").slideUp();
						$("#fehler_message").html("");
						$("#success_meldung").hide().html("");
					}, 5000);
				}
			}
		});
	} else {
		$("#fehler_message").slideDown();
		setTimeout(function() {
			$("#fehler_message").slideUp();
			$("#fehler_message").html("");
			$("#success_meldung").hide().html("");
		}, 5000);
	}
}

var curVorschlgId;
var vorschlagIndexNum;
var wordsTickerSggestForm = false;
function handelVorschlag(_de_, _ar_, vorschlagId, vorschlagIndex) {
	vorschlagIndexNum = vorschlagIndex;
	curVorschlgId = vorschlagId;
	if (wordsTickerSggestForm == false) {
		footerbarHeight = 25 + 120;
		$("#wordsTickerSggestForm").css("display", "block");
		$("#beitrag_deutsch").val(_de_);
		$("#beitrag_arabisch").val(_ar_);
		$("#footer-bar").css("border-top", "1px solid #CCCCCC").find(".fa-chevron-left").removeClass("fa-chevron-left").addClass("fa-chevron-down");
		wordsTickerSggestForm = true;
	} else {
		$("#beitrag_deutsch").val(_de_);
		$("#beitrag_arabisch").val(_ar_);
	}
}

function handelFooterbar() {
	if ($("#wordsTickerSggestForm").css("display") == "block") {
		footerbarHeight = 25;
		$("#footer-bar").css("border-top", "1px solid #CCCCCC").find("#wordsTickerSggestForm").css("display", "none").parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-left");
		wordsTickerSggestForm = false;
	} else {
		if ($("#footer-bar").css("width") != "16px") {
			$("#footer-bar").css("width", "16px").css("overflow", "hidden").find(".fa-chevron-left").removeClass("fa-chevron-left").addClass("fa-chevron-right");
			wordsTickerSggestForm = false;
		} else {
			$("#footer-bar").css("width", "100%").css("overflow", "visible").find(".fa-chevron-right").removeClass("fa-chevron-right").addClass("fa-chevron-left");
		}
	}
}

function sildeTip(id) {
	if ($("#" + id).next().css("display") != "none") {
		$("#" + id).next().slideUp();
	} else {
		$("#" + id).next().slideDown();
	}
}

function suggestTrans(wortTerm) {
	var split = wortTerm.split("?dt=");
	var deutsch_letters = /^[a-züßéäö:\/\\\<\>\{\}\[\];*#?=&%$"!'+.~A-ZÜÄÖ0-9\s(\-)]{0,}$/;
	if (deutsch_letters.test(decodeURIComponent(split[1]))) {
		if ($("#beitrag_arabisch").val() != "") {
			handelVorschlag(decodeURIComponent(split[1]), $("#beitrag_arabisch").val(), -1, -1);
		} else {
			handelVorschlag(decodeURIComponent(split[1]), "", -1, -1);
		}
	} else {
		if ($("#beitrag_deutsch").val() != "") {
			handelVorschlag($("#beitrag_deutsch").val(), decodeURIComponent(split[1]), -1, -1);
		} else {
			handelVorschlag("", decodeURIComponent(split[1]), -1, -1);
		}
	}
}

function sendQAQuestion(questionSubj, questionLang, dictURL, lingua) {
	var params = "questsubj=" + encode(questionSubj) + "&termlang=" + encode(questionLang) + "&dict=" + dictURL + "&questlang=" + lingua + "&sid=" + Math.random();
	window.location.href = basePath + subPath + "-ar/askquestion?questsubj=" + encode(questionSubj) + "&termlang=" + encode(questionLang) + "&dict=" + dictURL + "&questlang=" + lingua + "&sid=" + Math.random();
}

function VKI_buildKeyboardInputs() {
	var self = this;
	this.VKI_version = "Linguafocus";
	this.VKI_target = this.VKI_visible = "";
	this.VKI_shift = this.VKI_capslock = this.VKI_alternate = this.VKI_dead = false;
	this.VKI_deadkeysOn = false;
	this.VKI_kt = "Arabic";
	this.VKI_range = false;
	this.VKI_keyCenter = 3;
	this.VKI_layout = new Object();
	this.VKI_layoutDDK = new Object();
	this.VKI_layout.Arabic = [[["\u0630", "\u0651 "], ["1", "!", "\u00a1", "\u00b9"], ["2", "@", "\u00b2"], ["3", "#", "\u00b3"], ["4", "$", "\u00a4", "\u00a3"], ["5", "%", "\u20ac"], ["6", "^", "\u00bc"], ["7", "&", "\u00bd"], ["8", "*", "\u00be"], ["9", "(", "\u2018"], ["0", ")", "\u2019"], ["-", "_", "\u00a5"], ["=", "+", "\u00d7", "\u00f7"], ["Bksp", "Bksp"]], [["Tab", "Tab"], ["\u0636", "\u064e"], ["\u0635", "\u064b"], ["\u062b", "\u064f"], ["\u0642", "\u064c"], ["\u0641", "\u0644"], ["\u063a", "\u0625"], ["\u0639", "\u2018"], ["\u0647", "\u00f7"], ["\u062e", "\u00d7"], ["\u062d", "\u061b"], ["\u062c", "\u003c"], ["\u062f", "\u003e"], ["\u005c", "\u007c"]], [["Caps", "Caps"], ["\u0634", "\u0650"], ["\u0633", "\u064d"], ["\u064a", "\u005d"], ["\u0628", "\u005b"], ["\u0644", "\u0644"], ["\u0627", "\u0623"], ["\u062a", "\u0640"], ["\u0646", "\u060c"], ["\u0645", "\u002f"], ["\u0643", "\u003a"], ["\u0637", "\u0022"], ["Enter", "Enter"]], [["Shift", "Shift"], ["\u0626", "\u007e"], ["\u0621", "\u0652"], ["\u0624", "\u007d"], ["\u0631", "\u007b"], ["\u0644", "\u0644"], ["\u0649", "\u0622"], ["\u0629", "\u2019"], ["\u0648", "\u002c"], ["\u0632", "\u002e"], ["\u0638", "\u061f"], ["Shift", "Shift"]], [[" ", " ", " ", " "], ["Alt", "Alt"]]];
	this.VKI_layout.English = [[["`", "~"], ["1", "!"], ["2", "@"], ["3", "#"], ["4", "$"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]], [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["[", "{"], ["]", "}"], ["\\", "|"]], [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], [";", ":"], ["'", '"'], ["Enter", "Enter"]], [["Shift", "Shift"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", "<"], [".", ">"], ["/", "?"], ["Shift", "Shift"]], [[" ", " "]]];
	this.VKI_layout.French = [[["\u00b2", "\u00b3"], ["&", "1"], ["\u00e9", "2", "~"], ['"', "3", "#"], ["'", "4", "{"], ["(", "5", "["], ["-", "6", "|"], ["\u00e8", "7", "\u0060"], ["_", "8", "\\"], ["\u00e7", "9", "\u005e"], ["\u00e0", "0", "\u0040"], [")", "\u00b0", "]"], ["=", "+", "}"], ["Bksp", "Bksp"]], [["Tab", "Tab"], ["a", "A"], ["z", "Z"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["^", "\u00a8"], ["$", "\u00a3", "\u00a4"], ["Enter", "Enter"]], [["Caps", "Caps"], ["q", "Q"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["m", "M"], ["\u00f9", "%"], ["*", "\u03bc"]], [["Shift", "Shift"], ["<", ">"], ["w", "W"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], [",", "?"], [";", "."], [":", "/"], ["!", "\u00a7"], ["Shift", "Shift"]], [[" ", " ", " ", " "], ["AltGr", "AltGr"]]];
	this.VKI_layout.German = [[["\u005e", "\u00b0"], ["1", "!"], ["2", '"', "\u00b2"], ["3", "\u00a7", "\u00b3"], ["4", "$"], ["5", "%"], ["6", "&"], ["7", "/", "{"], ["8", "(", "["], ["9", ")", "]"], ["0", "=", "}"], ["\u00df", "?", "\\"], ["\u00b4", "\u0060"], ["Bksp", "Bksp"]], [["Tab", "Tab"], ["q", "Q", "\u0040"], ["w", "W"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["z", "Z"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00fc", "\u00dc"], ["+", "*", "~"], ["Enter", "Enter"]], [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00f6", "\u00d6"], ["\u00e4", "\u00c4"], ["#", "'"]], [["Shift", "Shift"], ["<", ">", "\u00a6"], ["y", "Y"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M", "\u00b5"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]], [[" ", " ", " ", " "], ["AltGr", "AltGr"]]];
	this.VKI_layout.Italian = [[["\u005c", "\u007c"], ["1", "!"], ["2", '"'], ["3", "\u00a3"], ["4", "$", "\u20ac"], ["5", "%"], ["6", "&"], ["7", "/"], ["8", "("], ["9", ")"], ["0", "="], ["'", "?"], ["\u00ec", "\u005e"], ["Bksp", "Bksp"]], [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00e8", "\u00e9", "[", "{"], ["+", "*", "]", "}"], ["Enter", "Enter"]], [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00f2", "\u00e7", "@"], ["\u00e0", "\u00b0", "#"], ["\u00f9", "\u00a7"]], [["Shift", "Shift"], ["<", ">"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]], [[" ", " ", " ", " "], ["AltGr", "AltGr"]]];
	this.VKI_layout.Russian = [[["\u0451", "\u0401"], ["1", "!"], ["2", '"'], ["3", "\u2116"], ["4", ";"], ["5", "%"], ["6", ":"], ["7", "?"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]], [["Tab", "Tab"], ["\u0439", "\u0419"], ["\u0446", "\u0426"], ["\u0443", "\u0423"], ["\u043A", "\u041A"], ["\u0435", "\u0415"], ["\u043D", "\u041D"], ["\u0433", "\u0413"], ["\u0448", "\u0428"], ["\u0449", "\u0429"], ["\u0437", "\u0417"], ["\u0445", "\u0425"], ["\u044A", "\u042A"], ["Enter", "Enter"]], [["Caps", "Caps"], ["\u0444", "\u0424"], ["\u044B", "\u042B"], ["\u0432", "\u0412"], ["\u0430", "\u0410"], ["\u043F", "\u041F"], ["\u0440", "\u0420"], ["\u043E", "\u041E"], ["\u043B", "\u041B"], ["\u0434", "\u0414"], ["\u0436", "\u0416"], ["\u044D", "\u042D"], ["\\", "/"]], [["Shift", "Shift"], ["/", "|"], ["\u044F", "\u042F"], ["\u0447", "\u0427"], ["\u0441", "\u0421"], ["\u043C", "\u041C"], ["\u0438", "\u0418"], ["\u0442", "\u0422"], ["\u044C", "\u042C"], ["\u0431", "\u0411"], ["\u044E", "\u042E"], [".", ","], ["Shift", "Shift"]], [[" ", " "]]];
	this.VKI_layout.Spanish = [[["\u00ba", "\u00aa", "\\"], ["1", "!", "|"], ["2", '"', "@"], ["3", "'", "#"], ["4", "$", "~"], ["5", "%", "\u20ac"], ["6", "&", "\u00ac"], ["7", "/"], ["8", "("], ["9", ")"], ["0", "="], ["'", "?"], ["\u00a1", "\u00bf"], ["Bksp", "Bksp"]], [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u0060", "^", "["], ["\u002b", "\u002a", "]"], ["Enter", "Enter"]], [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00f1", "\u00d1"], ["\u00b4", "\u00a8", "{"], ["\u00e7", "\u00c7", "}"]], [["Shift", "Shift"], ["<", ">"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]], [[" ", " ", " ", " "], ["AltGr", "AltGr"]]];
	this.VKI_layout["Portugu\u00eas"] = [[["'", '"'], ["1", "!", "\u00b9"], ["2", "@", "\u00b2"], ["3", "#", "\u00b3"], ["4", "$", "\u00a3"], ["5", "%", "\u00a2"], ["6", "\u00a8", "\u00ac"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+", "\u00a7"], ["Bksp", "Bksp"]], [["Tab", "Tab"], ["q", "Q", "/"], ["w", "W", "?"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00b4", "`"], ["[", "{", "\u00aa"], ["Enter", "Enter"]], [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00e7", "\u00c7"], ["~", "^"], ["]", "}", "\u00ba"], ["/", "?"]], [["Shift", "Shift"], ["\\", "|"], ["z", "Z"], ["x", "X"], ["c", "C", "\u20a2"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", "<"], [".", ">"], [":", ":"], ["Shift", "Shift"]], [[" ", " ", " ", " "], ["AltGr", "AltGr"]]];
	this.VKI_layout.Polski = [[["\u02DB", "\u00B7"], ["1", "!", "~"], ["2", '"', "\u02C7"], ["3", "#", "^"], ["4", "\u00A4", "\u02D8"], ["5", "%", "\u00B0"], ["6", "&", "\u02DB"], ["7", "/", "`"], ["8", "(", "\u00B7"], ["9", ")", "\u00B4"], ["0", "=", "\u02DD"], ["+", "?", "\u00A8"], ["'", "*", "\u00B8"], ["Bksp", "Bksp"]], [["Tab", "Tab"], ["q", "Q", "\\"], ["w", "W", "\u00A6"], ["e", "E"], ["r", "R"], ["t", "T"], ["z", "Z"], ["u", "U", "\u20AC"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u017C", "\u0144", "\u00F7"], ["\u015B", "\u0107", "\u00D7"], ["\u00F3", "\u017A"]], [["Caps", "Caps"], ["a", "A"], ["s", "S", "\u0111"], ["d", "D", "\u0110"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u0142", "\u0141", "$"], ["\u0105", "\u0119", "\u00DF"], ["Enter", "Enter"]], [["Shift", "Shift"], ["<", ">"], ["y", "Y"], ["x", "X"], ["c", "C"], ["v", "V", "@"], ["b", "B", "{"], ["n", "N", "}"], ["m", "M", "\u00A7"], [",", ";", "<"], [".", ":", ">"], ["-", "_"], ["Shift", "Shift"]], [[" ", " ", " ", " "], ["AltGr", "AltGr"]]];
	this.VKI_layout["\u65e5\u672c\u8a9e (ja)"] = [[["\uff5e"], ["\u306c", "\u30cc"], ["\u3075", "\u30d5"], ["\u3042", "\u30a2", "\u3041", "\u30a1"], ["\u3046", "\u30a6", "\u3045", "\u30a5"], ["\u3048", "\u30a8", "\u3047", "\u30a7"], ["\u304a", "\u30aa", "\u3049", "\u30a9"], ["\u3084", "\u30e4", "\u3083", "\u30e3"], ["\u3086", "\u30e6", "\u3085", "\u30e5"], ["\u3088", "\u30e8", "\u3087", "\u30e7"], ["\u308f", "\u30ef", "\u3092", "\u30f2"], ["\u307b", "\u30db", "\u30fc", "\uff1d"], ["\u3078", "\u30d8", "\uff3e", "\uff5e"], ["Bksp", "Bksp"]], [["Tab", "Tab"], ["\u305f", "\u30bf"], ["\u3066", "\u30c6"], ["\u3044", "\u30a4", "\u3043", "\u30a3"], ["\u3059", "\u30b9"], ["\u304b", "\u30ab"], ["\u3093", "\u30f3"], ["\u306a", "\u30ca"], ["\u306b", "\u30cb"], ["\u3089", "\u30e9"], ["\u305b", "\u30bb"], ["\u3001", "\u3001", "\uff20", "\u2018"], ["\u3002", "\u3002", "\u300c", "\uff5b"], ["\uffe5", "", "", "\uff0a"], ["\u309B", '"', "\uffe5", "\uff5c"]], [["Caps", "Caps"], ["\u3061", "\u30c1"], ["\u3068", "\u30c8"], ["\u3057", "\u30b7"], ["\u306f", "\u30cf"], ["\u304d", "\u30ad"], ["\u304f", "\u30af"], ["\u307e", "\u30de"], ["\u306e", "\u30ce"], ["\u308c", "\u30ec", "\uff1b", "\uff0b"], ["\u3051", "\u30b1", "\uff1a", "\u30f6"], ["\u3080", "\u30e0", "\u300d", "\uff5d"], ["Enter", "Enter"]], [["Shift", "Shift"], ["\u3064", "\u30c4"], ["\u3055", "\u30b5"], ["\u305d", "\u30bd"], ["\u3072", "\u30d2"], ["\u3053", "\u30b3"], ["\u307f", "\u30df"], ["\u3082", "\u30e2"], ["\u306d", "\u30cd", "\u3001", "\uff1c"], ["\u308b", "\u30eb", "\u3002", "\uff1e"], ["\u3081", "\u30e1", "\u30fb", "\uff1f"], ["\u308d", "\u30ed", "", "\uff3f"], ["Shift", "Shift"]], [["AltLk", "AltLk"], [" ", " ", " ", " "], ["Alt", "Alt"]]];
	this.VKI_layout["\u4e2d\u6587\u6ce8\u97f3\u7b26\u53f7 (zh)"] = [[["\u20AC", "~"], ["\u3105", "!"], ["\u3109", "@"], ["\u02C7", "#"], ["\u02CB", "$"], ["\u3113", "%"], ["\u02CA", "^"], ["\u02D9", "&"], ["\u311A", "*"], ["\u311E", ")"], ["\u3122", "("], ["\u3126", "_"], ["=", "+"], ["Bksp", "Bksp"]], [["Tab", "Tab"], ["\u3106", "q"], ["\u310A", "w"], ["\u310D", "e"], ["\u3110", "r"], ["\u3114", "t"], ["\u3117", "y"], ["\u3127", "u"], ["\u311B", "i"], ["\u311F", "o"], ["\u3123", "p"], ["[", "{"], ["]", "}"], ["\\", "|"]], [["Caps", "Caps"], ["\u3107", "a"], ["\u310B", "s"], ["\u310E", "d"], ["\u3111", "f"], ["\u3115", "g"], ["\u3118", "h"], ["\u3128", "j"], ["\u311C", "k"], ["\u3120", "l"], ["\u3124", ":"], ["'", '"'], ["Enter", "Enter"]], [["Shift", "Shift"], ["\u3108", "z"], ["\u310C", "x"], ["\u310F", "c"], ["\u3112", "v"], ["\u3116", "b"], ["\u3119", "n"], ["\u3129", "m"], ["\u311D", "<"], ["\u3121", ">"], ["\u3125", "?"], ["Shift", "Shift"]], [[" ", " "]]];
	this.VKI_layout["\u4e2d\u6587\u4ed3\u9889\u8f93\u5165\u6cd5 (zh)"] = [[["\u20AC", "~"], ["1", "!"], ["2", "@"], ["3", "#"], ["4", "$"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", ")"], ["0", "("], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]], [["Tab", "Tab"], ["\u624B", "q"], ["\u7530", "w"], ["\u6C34", "e"], ["\u53E3", "r"], ["\u5EFF", "t"], ["\u535C", "y"], ["\u5C71", "u"], ["\u6208", "i"], ["\u4EBA", "o"], ["\u5FC3", "p"], ["[", "{"], ["]", "}"], ["\\", "|"]], [["Caps", "Caps"], ["\u65E5", "a"], ["\u5C38", "s"], ["\u6728", "d"], ["\u706B", "f"], ["\u571F", "g"], ["\u7AF9", "h"], ["\u5341", "j"], ["\u5927", "k"], ["\u4E2D", "l"], [";", ":"], ["'", '"'], ["Enter", "Enter"]], [["Shift", "Shift"], ["\uFF3A", "z"], ["\u96E3", "x"], ["\u91D1", "c"], ["\u5973", "v"], ["\u6708", "b"], ["\u5F13", "n"], ["\u4E00", "m"], [",", "<"], [".", ">"], ["/", "?"], ["Shift", "Shift"]], [[" ", " "]]];
	this.VKI_layout["Turkish-F"] = [[["+", "*", "\u00ac"], ["1", "!", "\u00b9", "\u00a1"], ["2", '"', "\u00b2"], ["3", "^", "#", "\u00b3"], ["4", "$", "\u00bc", "\u00a4"], ["5", "%", "\u00bd"], ["6", "&", "\u00be"], ["7", "'", "{"], ["8", "(", "["], ["9", ")", "]"], ["0", "=", "}"], ["/", "?", "\\", "\u00bf"], ["-", "_", "|"], ["Bksp", "Bksp"]], [["Tab", "Tab"], ["f", "F", "@"], ["g", "G"], ["\u011f", "\u011e"], ["\u0131", "\u0049", "\u00b6", "\u00ae"], ["o", "O"], ["d", "D", "\u00a5"], ["r", "R"], ["n", "N"], ["h", "H", "\u00f8", "\u00d8"], ["p", "P", "\u00a3"], ["q", "Q", "\u00a8"], ["w", "W", "~"], ["Enter", "Enter"]], [["Caps", "Caps"], ["u", "U", "\u00e6", "\u00c6"], ["i", "\u0130", "\u00df", "\u00a7"], ["e", "E", "\u20ac"], ["a", "A", " ", "\u00aa"], ["\u00fc", "\u00dc"], ["t", "T"], ["k", "K"], ["m", "M"], ["l", "L"], ["y", "Y", "\u00b4"], ["\u015f", "\u015e"], ["x", "X", "`"]], [["Shift", "Shift"], ["<", ">", "|", "\u00a6"], ["j", "J", "\u00ab", "<"], ["\u00f6", "\u00d6", "\u00bb", ">"], ["v", "V", "\u00a2", "\u00a9"], ["c", "C"], ["\u00e7", "\u00c7"], ["z", "Z"], ["s", "S", "\u00b5", "\u00ba"], ["b", "B", "\u00d7"], [".", ":", "\u00f7"], [",", ";", "-"], ["Shift", "Shift"]], [[" ", " ", " ", " "], ["AltGr", "AltGr"]]];
	this.VKI_layout["Turkish-Q"] = [[['"', "\u00e9", "<"], ["1", "!", ">"], ["2", "'", "\u00a3"], ["3", "^", "#"], ["4", "+", "$"], ["5", "%", "\u00bd"], ["6", "&"], ["7", "/", "{"], ["8", "(", "["], ["9", ")", "]"], ["0", "=", "}"], ["*", "?", "\\"], ["-", "_", "|"], ["Bksp", "Bksp"]], [["Tab", "Tab"], ["q", "Q", "@"], ["w", "W"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["\u0131", "\u0049", "\u0069", "\u0130"], ["o", "O"], ["p", "P"], ["\u011f", "\u011e", "\u00a8"], ["\u00fc", "\u00dc", "~"], ["Enter", "Enter"]], [["Caps", "Caps"], ["a", "A", "\u00e6", "\u00c6"], ["s", "S", "\u00df"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u015f", "\u015e", "\u00b4"], ["\u0069", "\u0130"], [",", ";", "`"]], [["Shift", "Shift"], ["<", ">", "|"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], ["\u00f6", "\u00d6"], ["\u00e7", "\u00c7"], [".", ":"], ["Shift", "Shift"]], [[" ", " ", " ", " "], ["AltGr", "AltGr"]]];
	this.VKI_layoutDDK.Numpad = true;
	this.VKI_deadkey = new Object();
	this.VKI_deadkey['"'] = this.VKI_deadkey["\u00a8"] = [["a", "\u00e4"], ["e", "\u00eb"], ["i", "\u00ef"], ["o", "\u00f6"], ["u", "\u00fc"], ["y", "\u00ff"], ["\u03b9", "\u03ca"], ["\u03c5", "\u03cb"], ["A", "\u00c4"], ["E", "\u00cb"], ["I", "\u00cf"], ["O", "\u00d6"], ["U", "\u00dc"], ["Y", "\u0178"], ["\u0399", "\u03aa"], ["\u03a5", "\u03ab"]];
	this.VKI_deadkey["~"] = [["a", "\u00e3"], ["o", "\u00f5"], ["n", "\u00f1"], ["A", "\u00c3"], ["O", "\u00d5"], ["N", "\u00d1"]];
	this.VKI_deadkey["^"] = [["a", "\u00e2"], ["e", "\u00ea"], ["i", "\u00ee"], ["o", "\u00f4"], ["u", "\u00fb"], ["w", "\u0175"], ["y", "\u0177"], ["A", "\u00c2"], ["E", "\u00ca"], ["I", "\u00ce"], ["O", "\u00d4"], ["U", "\u00db"], ["W", "\u0174"], ["Y", "\u0176"]];
	this.VKI_deadkey["\u02c7"] = [["c", "\u010D"], ["s", "\u0161"], ["z", "\u017E"], ["r", "\u0159"], ["d", "\u010f"], ["t", "\u0165"], ["n", "\u0148"], ["l", "\u013e"], ["e", "\u011b"], ["C", "\u010C"], ["S", "\u0160"], ["Z", "\u017D"], ["R", "\u0158"], ["D", "\u010e"], ["T", "\u0164"], ["N", "\u0147"], ["L", "\u013d"], ["E", "\u011a"]];
	this.VKI_deadkey["\u02d8"] = [["a", "\u0103"], ["g", "\u011f"], ["A", "\u0102"], ["G", "\u011e"]];
	this.VKI_deadkey["`"] = [["a", "\u00e0"], ["e", "\u00e8"], ["i", "\u00ec"], ["o", "\u00f2"], ["u", "\u00f9"], ["A", "\u00c0"], ["E", "\u00c8"], ["I", "\u00cc"], ["O", "\u00d2"], ["U", "\u00d9"]];
	this.VKI_deadkey["'"] = this.VKI_deadkey["\u00b4"] = this.VKI_deadkey["\u0384"] = [["a", "\u00e1"], ["e", "\u00e9"], ["i", "\u00ed"], ["o", "\u00f3"], ["u", "\u00fa"], ["\u03b1", "\u03ac"], ["\u03b5", "\u03ad"], ["\u03b7", "\u03ae"], ["\u03b9", "\u03af"], ["\u03bf", "\u03cc"], ["\u03c5", "\u03cd"], ["\u03c9", "\u03ce"], ["A", "\u00c1"], ["E", "\u00c9"], ["I", "\u00cd"], ["O", "\u00d3"], ["U", "\u00da"], ["\u0391", "\u0386"], ["\u0395", "\u0388"], ["\u0397", "\u0389"], ["\u0399", "\u038a"], ["\u039f", "\u038c"], ["\u03a5", "\u038e"], ["\u03a9", "\u038f"]];
	this.VKI_deadkey["\u02dd"] = [["o", "\u0151"], ["u", "\u0171"], ["O", "\u0150"], ["U", "\u0170"]];
	this.VKI_deadkey["\u0385"] = [["\u03b9", "\u0390"], ["\u03c5", "\u03b0"]];
	this.VKI_deadkey["\u00b0"] = this.VKI_deadkey["\u00ba"] = [["a", "\u00e5"], ["A", "\u00c5"]];
	var inputElems = [document.getElementsByTagName("input"), document.getElementsByTagName("textarea")];
	for (var x = 0,
	    inputCount = 0,
	    elem; elem = inputElems[x++]; ) {
		if (elem) {
			for (var y = 0,
			    keyid = "",
			    ex; ex = elem[y++]; ) {
				if ((ex.nodeName == "TEXTAREA" || ex.type == "text" || ex.type == "password") && (ex.id.indexOf("eingabefeld") > -1 || ex.className.indexOf("keyboardInput") > -1)) {
					if (!ex.id) {
						do {
							keyid = "keyboardInputInitiator" + inputCount++;
						} while(document.getElementById(keyid));
						ex.id = keyid;
					} else {
						keyid = ex.id;
					}
					if (ex.id.indexOf("eingabefeld") > -1) {
						var keybut = document.getElementById("btn-keyboard");
						keybut.onclick = (function(a) {
							return function() {
								self.VKI_show(a);
							};
						})(keyid);
					} else {
						var keybut = document.createElement("img");
						keybut.src = basePath + "images/keyboard.png";
						keybut.alt = "Keyboard interface";
						keybut.id = "tastatur_symb";
						keybut.className = "keyboardInputInitiator";
						keybut.title = "Choose your graphical keyboard";
						keybut.onclick = (function(a) {
							return function() {
								self.VKI_show(a);
							};
						})(keyid);
						ex.parentNode.insertBefore(keybut, ex.nextSibling);
					}
					if (!window.sidebar && !window.opera) {
						ex.onclick = ex.onselect = function() {
							if (self.VKI_target.createTextRange) {
								self.VKI_range = document.selection.createRange();
							}
						};
					}
				}
			}
		}
	}
	this.VKI_keyboard = document.createElement("table");
	this.VKI_keyboard.id = "keyboardInputMaster";
	this.VKI_keyboard.cellSpacing = this.VKI_keyboard.cellPadding = this.VKI_keyboard.border = "0";
	var layouts = 0;
	for (ktype in this.VKI_layout) {
		if ( typeof this.VKI_layout[ktype] == "object") {
			layouts++;
		}
	}
	var thead = document.createElement("thead");
	var tr = document.createElement("tr");
	var th = document.createElement("th");
	if (layouts > 1) {
		var kblist = document.createElement("select");
		for (ktype in this.VKI_layout) {
			if ( typeof this.VKI_layout[ktype] == "object") {
				var opt = document.createElement("option");
				opt.value = ktype;
				opt.appendChild(document.createTextNode(ktype));
				kblist.appendChild(opt);
			}
		}
		kblist.value = this.VKI_kt;
		kblist.onchange = function() {
			self.VKI_kt = this.value;
			self.VKI_buildKeys();
			self.VKI_position();
		};
		th.appendChild(kblist);
	}
	var label = document.createElement("label");
	var checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.style.visibility = "hidden";
	checkbox.style.marginLeft = "-14px";
	checkbox.checked = this.VKI_deadkeysOn;
	checkbox.title = "Toggle dead key input";
	checkbox.onclick = function() {
		self.VKI_deadkeysOn = this.checked;
		self.VKI_deadkeysOn = this.style.visibility = "hidden";
		this.nextSibling.nodeValue = " << Choose your Language";
		this.nextSibling.style.fontWeight = "bold";
		self.VKI_modify("");
		return true;
	};
	label.appendChild(checkbox);
	label.appendChild(document.createTextNode(" << Tastatur auswählen"));
	label.style.fontWeight = "bold";
	label.style.color = "#999";
	th.appendChild(label);
	tr.appendChild(th);
	var td = document.createElement("td");
	var clearer = document.createElement("span");
	clearer.id = "keyboardInputClear";
	clearer.appendChild(document.createTextNode("Clear"));
	clearer.title = "Clear this input";
	clearer.onmousedown = function() {
		this.className = "pressed";
	};
	clearer.onmouseup = function() {
		this.className = "";
	};
	clearer.onclick = function() {
		self.VKI_target.value = "";
		self.VKI_target.focus();
		return false;
	};
	td.appendChild(clearer);
	var closer = document.createElement("span");
	closer.id = "keyboardInputClose";
	closer.appendChild(document.createTextNode("X"));
	closer.title = "Close this window";
	closer.onmousedown = function() {
		this.className = "pressed";
	};
	closer.onmouseup = function() {
		this.className = "";
	};
	closer.onclick = function() {
		self.VKI_close();
	};
	td.appendChild(closer);
	tr.appendChild(td);
	thead.appendChild(tr);
	this.VKI_keyboard.appendChild(thead);
	var tbody = document.createElement("tbody");
	var tr = document.createElement("tr");
	var td = document.createElement("td");
	td.colSpan = "2";
	var div = document.createElement("div");
	div.id = "keyboardInputLayout";
	td.appendChild(div);
	var div = document.createElement("div");
	var ver = document.createElement("var");
	ver.appendChild(document.createTextNode(this.VKI_version));
	div.appendChild(ver);
	td.appendChild(div);
	tr.appendChild(td);
	tr.style.color = "#333333";
	tbody.appendChild(tr);
	this.VKI_keyboard.appendChild(tbody);
	this.VKI_buildKeys = function() {
		this.VKI_shift = this.VKI_capslock = this.VKI_alternate = this.VKI_dead = false;
		this.VKI_deadkeysOn = (this.VKI_layoutDDK[this.VKI_kt]) ? false : this.VKI_keyboard.getElementsByTagName("label")[0].getElementsByTagName("input")[0].checked;
		var container = this.VKI_keyboard.tBodies[0].getElementsByTagName("div")[0];
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}
		for (var x = 0,
		    hasDeadKey = false,
		    lyt; lyt = this.VKI_layout[this.VKI_kt][x++]; ) {
			var table = document.createElement("table");
			table.cellSpacing = table.cellPadding = table.border = "0";
			if (lyt.length <= this.VKI_keyCenter) {
				table.className = "keyboardInputCenter";
			}
			var tbody = document.createElement("tbody");
			var tr = document.createElement("tr");
			for (var y = 0,
			    lkey; lkey = lyt[y++]; ) {
				if (!this.VKI_layoutDDK[this.VKI_kt] && !hasDeadKey) {
					for (var z = 0; z < lkey.length; z++) {
						if (this.VKI_deadkey[lkey[z]]) {
							hasDeadKey = true;
						}
					}
				}
				var td = document.createElement("td");
				td.appendChild(document.createTextNode(lkey[0]));
				var alive = false;
				if (this.VKI_deadkeysOn) {
					for (key in this.VKI_deadkey) {
						if (key === lkey[0]) {
							alive = true;
						}
					}
				}
				td.className = (alive) ? "alive" : "";
				if (lyt.length > this.VKI_keyCenter && y == lyt.length) {
					td.className += " last";
				}
				if (lkey[0] == " ") {
					td.style.paddingLeft = td.style.paddingRight = "50px";
				}
				td.onmouseover = function() {
					if (this.className != "dead" && this.firstChild.nodeValue != "\xa0") {
						this.className += " hover";
					}
				};
				td.onmouseout = function() {
					if (this.className != "dead") {
						this.className = this.className.replace(/ ?(hover|pressed)/g, "");
					}
				};
				td.onmousedown = function() {
					if (this.className != "dead" && this.firstChild.nodeValue != "\xa0") {
						this.className += " pressed";
					}
				};
				td.onmouseup = function() {
					if (this.className != "dead") {
						this.className = this.className.replace(/ ?pressed/g, "");
					}
				};
				td.ondblclick = function() {
					return false;
				};
				switch(lkey[1]) {
				case"Caps":
				case"Shift":
				case"Alt":
				case"AltGr":
					td.onclick = (function(type) {
						return function() {
							self.VKI_modify(type);
							return false;
						};
					})(lkey[1]);
					break;
				case"Tab":
					td.onclick = function() {
						self.VKI_insert("\t");
						return false;
					};
					break;
				case"Bksp":
					td.onclick = function() {
						self.VKI_target.focus();
						if (self.VKI_target.setSelectionRange) {
							var srt = self.VKI_target.selectionStart;
							var len = self.VKI_target.selectionEnd;
							if (srt < len) {
								srt++;
							}
							self.VKI_target.value = self.VKI_target.value.substr(0, srt - 1) + self.VKI_target.value.substr(len);
							self.VKI_target.setSelectionRange(srt - 1, srt - 1);
						} else {
							if (self.VKI_target.createTextRange) {
								try {
									self.VKI_range.select();
								} catch(e) {
								}
								self.VKI_range = document.selection.createRange();
								if (!self.VKI_range.text.length) {
									self.VKI_range.moveStart("character", -1);
								}
								self.VKI_range.text = "";
							} else {
								self.VKI_target.value = self.VKI_target.value.substr(0, self.VKI_target.value.length - 1);
							}
						}
						if (self.VKI_shift) {
							self.VKI_modify("Shift");
						}
						if (self.VKI_alternate) {
							self.VKI_modify("AltGr");
						}
						return true;
					};
					break;
				case"Enter":
					td.onclick = function() {
						if (self.VKI_target.nodeName == "TEXTAREA") {
							self.VKI_insert("\n");
						} else {
							self.VKI_close();
						}
						return true;
					};
					break;
				default:
					td.onclick = function() {
						if (self.VKI_deadkeysOn && self.VKI_dead) {
							if (self.VKI_dead != this.firstChild.nodeValue) {
								for (key in self.VKI_deadkey) {
									if (key == self.VKI_dead) {
										if (this.firstChild.nodeValue != " ") {
											for (var z = 0,
											    rezzed = false,
											    dk; dk = self.VKI_deadkey[key][z++]; ) {
												if (dk[0] == this.firstChild.nodeValue) {
													self.VKI_insert(dk[1]);
													rezzed = true;
													break;
												}
											}
										} else {
											self.VKI_insert(self.VKI_dead);
											rezzed = true;
										}
										break;
									}
								}
							} else {
								rezzed = true;
							}
						}
						self.VKI_dead = false;
						if (!rezzed && this.firstChild.nodeValue != "\xa0") {
							if (self.VKI_deadkeysOn) {
								for (key in self.VKI_deadkey) {
									if (key == this.firstChild.nodeValue) {
										self.VKI_dead = key;
										this.className = "dead";
										if (self.VKI_shift) {
											self.VKI_modify("Shift");
										}
										if (self.VKI_alternate) {
											self.VKI_modify("AltGr");
										}
										break;
									}
								}
								if (!self.VKI_dead) {
									self.VKI_insert(this.firstChild.nodeValue);
								}
							} else {
								self.VKI_insert(this.firstChild.nodeValue);
							}
						}
						self.VKI_modify("");
						return false;
					};
				}
				tr.appendChild(td);
				tbody.appendChild(tr);
				table.appendChild(tbody);
				for (var z = lkey.length; z < 4; z++) {
					lkey[z] = "\xa0";
				}
			}
			container.appendChild(table);
		}
		this.VKI_keyboard.getElementsByTagName("label")[0].style.display = (hasDeadKey) ? "inline" : "none";
	};
	this.VKI_buildKeys();
	VKI_disableSelection(this.VKI_keyboard);
	this.VKI_modify = function(type) {
		switch(type) {
		case"Alt":
		case"AltGr":
			this.VKI_alternate = !this.VKI_alternate;
			break;
		case"Caps":
			this.VKI_capslock = !this.VKI_capslock;
			break;
		case"Shift":
			this.VKI_shift = !this.VKI_shift;
			break;
		}
		var vchar = 0;
		if (!this.VKI_shift != !this.VKI_capslock) {
			vchar += 1;
		}
		var tables = this.VKI_keyboard.getElementsByTagName("table");
		for (var x = 0; x < tables.length; x++) {
			var tds = tables[x].getElementsByTagName("td");
			for (var y = 0; y < tds.length; y++) {
				var dead = alive = target = false;
				var lkey = this.VKI_layout[this.VKI_kt][x][y];
				switch(lkey[1]) {
				case"Alt":
				case"AltGr":
					if (this.VKI_alternate) {
						dead = true;
					}
					break;
				case"Shift":
					if (this.VKI_shift) {
						dead = true;
					}
					break;
				case"Caps":
					if (this.VKI_capslock) {
						dead = true;
					}
					break;
				case"Tab":
				case"Enter":
				case"Bksp":
					break;
				default:
					if (type) {
						tds[y].firstChild.nodeValue = lkey[vchar + ((this.VKI_alternate && lkey.length == 4) ? 2 : 0)];
					}
					if (this.VKI_deadkeysOn) {
						var letter_char = tds[y].firstChild.nodeValue;
						if (this.VKI_dead) {
							if (letter_char == this.VKI_dead) {
								dead = true;
							}
							for (var z = 0; z < this.VKI_deadkey[this.VKI_dead].length; z++) {
								if (letter_char == this.VKI_deadkey[this.VKI_dead][z][0]) {
									target = true;
									break;
								}
							}
						}
						for (key in this.VKI_deadkey) {
							if (key === letter_char) {
								alive = true;
								break;
							}
						}
					}
				}
				tds[y].className = (dead) ? "dead" : ((target) ? "target" : ((alive) ? "alive" : ""));
				if (y == tds.length - 1 && tds.length > this.VKI_keyCenter) {
					tds[y].className += " last";
				}
			}
		}
		this.VKI_target.focus();
	};
	this.VKI_insert = function(text) {
		this.VKI_target.focus();
		if (this.VKI_target.setSelectionRange) {
			var srt = this.VKI_target.selectionStart;
			var len = this.VKI_target.selectionEnd;
			this.VKI_target.value = this.VKI_target.value.substr(0, srt) + text + this.VKI_target.value.substr(len);
			if (text == "\n" && window.opera) {
				srt++;
			}
			this.VKI_target.setSelectionRange(srt + text.length, srt + text.length);
		} else {
			if (this.VKI_target.createTextRange) {
				try {
					this.VKI_range.select();
				} catch(e) {
				}
				this.VKI_range = document.selection.createRange();
				this.VKI_range.text = text;
				this.VKI_range.collapse(true);
				this.VKI_range.select();
			} else {
				this.VKI_target.value += text;
			}
		}
		if (this.VKI_shift) {
			this.VKI_modify("Shift");
		}
		if (this.VKI_alternate) {
			this.VKI_modify("AltGr");
		}
		this.VKI_target.focus();
		checklang(text);
	};
	this.VKI_show = function(id) {
		if (this.VKI_target = document.getElementById(id)) {
			if (this.VKI_visible != id) {
				this.VKI_range = "";
				try {
					this.VKI_keyboard.parentNode.removeChild(this.VKI_keyboard);
				} catch(e) {
				}
				var elem = this.VKI_target;
				this.VKI_target.keyboardPosition = "absolute";
				do {
					if (VKI_getStyle(elem, "position") == "fixed") {
						this.VKI_target.keyboardPosition = "fixed";
						break;
					}
				} while(elem=elem.offsetParent);
				this.VKI_keyboard.style.top = this.VKI_keyboard.style.right = this.VKI_keyboard.style.bottom = this.VKI_keyboard.style.left = "auto";
				this.VKI_keyboard.style.position = this.VKI_target.keyboardPosition;
				document.body.appendChild(this.VKI_keyboard);
				this.VKI_visible = this.VKI_target.id;
				this.VKI_position();
				this.VKI_target.focus();
			} else {
				this.VKI_close();
			}
		}
	};
	this.VKI_position = function() {
		if (self.VKI_visible != "") {
			var inputElemPos = VKI_findPos(self.VKI_target);
			self.VKI_keyboard.style.top = inputElemPos[1] - ((self.VKI_target.keyboardPosition == "fixed") ? document.body.scrollTop : 0) + self.VKI_target.offsetHeight + 3 + "px";
			self.VKI_keyboard.style.left = Math.min(VKI_innerDimensions()[0] - self.VKI_keyboard.offsetWidth - 15, inputElemPos[0]) + "px";
		}
	};
	if (window.addEventListener) {
		window.addEventListener("resize", this.VKI_position, false);
	} else {
		if (window.attachEvent) {
			window.attachEvent("onresize", this.VKI_position);
		}
	}
	this.VKI_close = function() {
		try {
			this.VKI_keyboard.parentNode.removeChild(this.VKI_keyboard);
		} catch(e) {
		}
		this.VKI_visible = "";
		this.VKI_target.focus();
		this.VKI_target = "";
	};
}

if (window.addEventListener) {
	window.addEventListener("load", VKI_buildKeyboardInputs, false);
} else {
	if (window.attachEvent) {
		window.attachEvent("onload", VKI_buildKeyboardInputs);
	}
}
function VKI_findPos(obj) {
	var curleft = curtop = 0;
	do {
		curleft += obj.offsetLeft;
		curtop += obj.offsetTop;
	} while(obj=obj.offsetParent);
	return [curleft, curtop];
}

function VKI_innerDimensions() {
	if (self.innerHeight) {
		return [self.innerWidth, self.innerHeight];
	} else {
		if (document.documentElement && document.documentElement.clientHeight) {
			return [document.documentElement.clientWidth, document.documentElement.clientHeight];
		} else {
			if (document.body) {
				return [document.body.clientWidth, document.body.clientHeight];
			}
		}
	}
	return [0, 0];
}

function VKI_getStyle(obj, styleProp) {
	if (obj.currentStyle) {
		var y = obj.currentStyle[styleProp];
	} else {
		if (window.getComputedStyle) {
			var y = window.getComputedStyle(obj,null)[styleProp];
		}
	}
	return y;
}

function VKI_disableSelection(elem) {
	elem.onselectstart = function() {
		return false;
	};
	elem.unselectable = "on";
	elem.style.MozUserSelect = "none";
	elem.style.cursor = "default";
	if (window.opera) {
		elem.onmousedown = function() {
			return false;
		};
	}
}
