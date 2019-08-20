var checkExist = setInterval(function() {
	if (document.getElementsByClassName('xxzyqm-6 iyYdCn')[1]) {
		clearInterval(checkExist);
		my_logic();
	}
}, 100); // check every 100ms

function my_logic() {
	console.log(document.getElementsByClassName("Select-arrow")[1]);
	document.getElementsByClassName('xxzyqm-6 iyYdCn')[1].insertAdjacentHTML('afterbegin', '<select id="my_sort" name="tstselect" class="xxzyqm-8 cFkWxU xxzyqm-7 dYIrGR">\
		<option value="empty" selected="selected">-</option>\
		<option value="desc">Wysokość zniżki malejąco</option>\
		<option value="asc">Wysokość zniżki rosnąco</option>\
		<option value="perc_desc">Wysokość zniżki(%) malejąco</option>\
		<option value="perc_asc">Wysokość zniżki(%) rosnąco</option>\
		</select>');

	// main item, prev price, current price, price header, discount
	var classnames1 = ["sc-1amw43v-0 jWHjNR tw1g4l-0 daYEVc sc-bdVaJa fdVMCg", "sc-132mw3r-2 jkShJe sc-132mw3r-0 kflyQm", "sc-132mw3r-3 eCMOrC sc-132mw3r-0 kflyQm", "sc-132mw3r-1 ajjrv", "circle-text margin sc-132mw3r-3 eCMOrC sc-132mw3r-0 kflyQm"];
	var classnames2 = ["sc-1amw43v-0 jWHjNR tw1g4l-0 daYEVc sc-bdVaJa fZgNo", "sc-132mw3r-2 ggXgVi sc-132mw3r-0 dOToIf", "sc-132mw3r-3 eCMOrC sc-132mw3r-0 dOToIf", "sc-1we1kip-11 jYagzQ sc-132mw3r-1 hzVdjR", "circle-text sc-132mw3r-3 eCMOrC sc-132mw3r-0 dOToIf"];
	var classnames3 = ["sc-1amw43v-0 jWHjNR tw1g4l-0 daYEVc sc-bdVaJa eoRAda", "sc-132mw3r-2 jqLYoe sc-132mw3r-0 dOToIf", "sc-132mw3r-3 dQmTsM sc-132mw3r-0 dOToIf", "c2h67b-13 geZvbC sc-132mw3r-1 hzVdjR", "circle-text sc-132mw3r-3 dQmTsM sc-132mw3r-0 dOToIf"];

	my_sort.onchange = function(element) {
		var classnames = [];
		if (document.getElementsByClassName(classnames1[0])[1])
			classnames = classnames1;
		else if (document.getElementsByClassName(classnames2[0])[1])
			classnames = classnames2;
		else if (document.getElementsByClassName(classnames3[0])[1])
			classnames = classnames3;

		var elems = [];
		var sel = document.getElementById("my_sort");
		var order = sel.options[sel.selectedIndex].value;

		if (order == 'empty')
			return;

		let items = document.getElementsByClassName(classnames[0]);
		[].forEach.call(items, function(elem) {
			var prev = elem.querySelector("[class='" + classnames[1] + "']");

			// sometimes they don't add previous value...
			if (prev) {
				var prev_text = prev.outerText.replace(" ", "");
				var prev_value = parseFloat(prev_text.replace("/(\d*),(\d*)/gi", "$1.$2"));
			} else
				var prev_value = 999999;

			var current = elem.querySelector("[class='" + classnames[2] + "']");
			var current_text = current.outerText.replace(" ", "");
			var current_value = parseFloat(current_text.replace("/(\d*),(\d*)/gi", "$1.$2"));


			if (order == "desc") {
				var diff = prev_value - current_value;
				insert(elem, diff, elems, numberDes);
			} else if (order == "asc") {
				var diff = prev_value - current_value;
				insert(elem, diff, elems, numberAs);
			} else if (order == "perc_asc") {
				var perc = Math.round(100 - 100 * current_value / prev_value);
				insert(elem, perc, elems, numberAs);
			} else if (order == "perc_desc") {
				var perc = Math.round(100 - 100 * current_value / prev_value);
				insert(elem, perc, elems, numberDes);
			}
		});

		// console.log(elems);
		// change items order
		var parent = elems[1][0].parentElement;
		parent.innerHTML = '';
		[].forEach.call(elems, function(elem) {
			var discount = elem[0].querySelector("[class='" + classnames[4] + "']");
			if (discount)
				discount.parentNode.removeChild(discount);
			var unit = "";
			if (order == "perc_asc" | order == "perc_desc")
				unit = "%";
			elem[0].querySelector("[class='" + classnames[3] + "']").insertAdjacentHTML('beforeend', '<div class="' + classnames[4] + '"><div>' + elem[1] + unit + '</div></div>');
			parent.appendChild(elem[0]);
		});
	}
}

function numberAs(a, b) {
	return a[1] - b[1];
}

function numberDes(a, b) {
	return b[1] - a[1];
}


function insert(elem, value, array, order_func) {
	array.push([elem, value]);
	array.sort(order_func);
}