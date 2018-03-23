const VueWarehouse = {
	install(Vue, options = {}) {}
};

export default VueWarehouse;

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(VueWarehouse);
}
