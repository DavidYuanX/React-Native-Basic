export default class NavigationUtil {

    /**
     * @Description: 跳转指定页面
     * @parpm params 要传递的参数
     * @parpm page 要跳转的页面名（页面路由名）
     * @date 2019/11/16
    */
    static goPage(params,page){
        const navigation = NavigationUtil.navigation;
        if(!navigation){
            console.log('NavigationUtil.navigation can not be null');
        }
        navigation.navigate(
            page,
            {
                ...params
            }
        )
    }
    /**
     * @Description: 重置到首页
     * @date 2019/11/16
    */
    static resetToHomePage(params) {
        const {navigation} = params;
        navigation.navigate('Main');
    }
}
