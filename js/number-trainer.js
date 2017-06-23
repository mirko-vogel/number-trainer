function get_tts_url(s) {
	//return 'http://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=' + s + '&tl=ar';
	return "https://code.responsivevoice.org/getvoice.php?t=" + encodeURIComponent(s) + "&tl=ar";
}

function spell(s) {
	var audio = new Audio();
	audio.src = get_tts_url(s);
	console.log("Spelling " + s);
	console.log("TTS url is: " + audio.src);
	audio.play();
}
//spell("9/9/1989");

function get_random_int(min, max) {
	return Math.floor((Math.random() * (max - min + 1)) + min);
}

function do_spell_random_number() {
	min = $('#min_num').val();
	max = $('#max_num').val();
	n = get_random_int(min, max);
	spell(n);
}

var number_speller = {
	running : false,
	audio : new Audio(),

	start : function() {
		if (this.running)
			return;
		this.running = true;
		this.spell_number_cb();
	},

	stop : function() {
		this.audio.pause();
		this.running = false;
	},

	spell_after_wait_cb : function() {
		delay = $('#delay').val();
		setTimeout(this.spell_number_cb.bind(this), Number(delay) * 1000);
	},

	spell_number_cb : function() {
		if (!this.running)
			return;

		min = $('#min_num').val();
		max = $('#max_num').val();
		n = get_random_int(min, max);

		console.log("Spelling " + n);
		this.audio.src = get_tts_url(n.toString());
		this.audio.onended = this.spell_after_wait_cb.bind(this);
		this.audio.play();
		
	}
};
