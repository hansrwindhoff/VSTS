module t1{

	var complex= {a:42,b:43};
	var clo1 = (cpx) => {
		cpx.a++;
		console.log(cpx.a);
	};
	clo1(complex);
	clo1(complex);
	clo1(complex);
	clo1(complex);
	clo1(complex);




	var simple = 42;
	var clo2 = function (smp) {
		smp++;
		console.log(smp);
	};
	clo2(simple);
	clo2(simple);
	clo2(simple);
	clo2(simple);
	clo2(simple);
}