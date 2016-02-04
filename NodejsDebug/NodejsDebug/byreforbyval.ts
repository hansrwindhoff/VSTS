module t1b{

	var complex= {a:42,b:43};
	var fn1 = (cpx) => {
		cpx.a++;
		console.log(cpx.a);
	};
	fn1(complex);
	fn1(complex);
	fn1(complex);
	fn1(complex);
	fn1(complex);




	var simple = 42;
	var fn2 = smp => {
	  smp++;
	  console.log(smp);
	};
	fn2(simple);
	fn2(simple);
	fn2(simple);
	fn2(simple);
	fn2(simple);
}