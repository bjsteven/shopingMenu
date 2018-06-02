export const loadMixin = {
    data(){
        return {
            isLoadShow: true,//loading状态
        }
    },
    methods: {
        _hideLoad(){
            let timer;
            clearTimeout(timer);
            timer = setTimeout(()=>{
                this.isLoadShow = false
            },500)
        }
    }
};
