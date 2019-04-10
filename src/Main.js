import React, { Component } from 'react';
import {
    Image,
    View,
    TextInput,
    TouchableNativeFeedback,
    StyleSheet,
} from 'react-native';
import {
    TabNavigator,
    StackNavigator,
    DrawerNavigator,
    DrawerActions
} from 'react-navigation';
// 页面跳转的动画效果
import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator";
import Icon from "react-native-vector-icons/AntDesign";

//首页的页面
import Home from './Home';
import Type from './Type';
import ShopCar from './ShopCar';
import Mine from './Mine';

import VideoDetailOne from './video/VideoDetailOne';
import VideoDetailTwo from './video/VideoDetailTwo';
//侧滑菜单的页面
import Wallet from "./drawer/Wallet";
import CardCoupons from "./drawer/CardCoupons";
import Invite from "./drawer/Invite";


const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
    headerSearch: {
        width: '65%',
        marginLeft: '16%',
        marginTop: 12,
        marginBottom: 12,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#fff',
        borderWidth: 1,
        padding: 5,
        fontSize: 14
    },
    headerButton: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

/**
 * 配置底部标签
 */
const Tab = TabNavigator({
    //每一个页面的配置
    Home: {
        screen: Home,
        navigationOptions: {
            //stackNavigator的属性
            headerTitle: '首页',
            gestureResponseDistance: { horizontal: 300 },
            headerBackTitle: null,
            headerStyle: { backgroundColor: '#EB3695' },//导航栏的样式
            headerTitleStyle: {//导航栏文字的样式
                color: 'white',
                //设置标题的大小
                fontSize: 16,
                //居中显示
                alignSelf: 'center',
            },
            //tab 的属性
            tabBarLabel: '首页',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../images/ic_home.png')}
                    style={[{ height: 24, width: 24 }, { tintColor: tintColor }]} />
            ),

        },
    },
    Type: {
        screen: Type,
        navigationOptions: {
            //stackNavigator的属性
            headerTitle: '分类',
            gestureResponseDistance: { horizontal: 300 },
            headerBackTitle: null,
            headerStyle: { backgroundColor: '#EB3695' },//导航栏的样式
            headerTitleStyle: {//导航栏文字的样式
                color: 'white',
                //设置标题的大小
                fontSize: 16,
                //居中显示
                alignSelf: 'center',
            },
            //tab 的属性
            tabBarLabel: '分类',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../images/ic_type.png')}
                    style={[{ height: 24, width: 24 }, { tintColor: tintColor }]}
                />
            ),
        }
    },
    ShopCar: {
        screen: ShopCar,
        navigationOptions: {
            //stackNavigator的属性
            headerTitle: '购物车',
            gestureResponseDistance: { horizontal: 300 },
            headerBackTitle: null,
            headerStyle: { backgroundColor: '#EB3695' },//导航栏的样式
            headerTitleStyle: {//导航栏文字的样式
                color: 'white',
                //设置标题的大小
                fontSize: 16,
                //居中显示
                alignSelf: 'center',
            },
            //tab 的属性
            tabBarLabel: '购物车',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../images/ic_shop_car.png')}
                    style={[{ height: 24, width: 24 }, { tintColor: tintColor }]}
                />
            ),
        }
    },
    Mine: {
        screen: Mine,
        navigationOptions: {
            //stackNavigator的属性
            headerTitle: '我的',
            gestureResponseDistance: { horizontal: 300 },
            headerBackTitle: null,
            headerStyle: { backgroundColor: '#EB3695' },//导航栏的样式
            headerTitleStyle: {//导航栏文字的样式
                color: 'white',
                //设置标题的大小
                fontSize: 16,
                //居中显示
                alignSelf: 'center',
            },
            //tab 的属性
            tabBarLabel: '我的',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../images/ic_me.png')}
                    style={[{ height: 24, width: 24 }, { tintColor: tintColor }]}
                />
            ),
        }
    },

}, {
        //设置TabNavigator的位置
        tabBarPosition: 'bottom',
        //是否在更改标签时显示动画
        animationEnabled: true,
        //是否允许在标签之间进行滑动
        swipeEnabled: true,
        //按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
        backBehavior: "none",
        //设置Tab标签的属性

        tabBarOptions: {
            //Android属性
            upperCaseLabel: false,//是否使标签大写，默认为true
            //共有属性
            showIcon: true,//是否显示图标，默认关闭
            showLabel: true,//是否显示label，默认开启
            activeTintColor: '#0093ff',//label和icon的前景色 活跃状态下（选中）
            inactiveTintColor: 'gray',//label和icon的前景色 活跃状态下（未选中）
            style: { //TabNavigator 的背景颜色
                backgroundColor: 'white',
                height: 55,
            },
            indicatorStyle: {//标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
                height: 0,
            },
            labelStyle: {//文字的样式
                fontSize: 13,
                marginTop: -5,
                marginBottom: 5,
            },
            iconStyle: {//图标的样式
                marginBottom: 5,
            }
        },
    });
/*
 * 配置堆栈导航
 */
const Stack = StackNavigator({
    Tab: {
        screen: Tab,
        navigationOptions: ({ navigation, screenProps }) => ({
            //允许使用返回手势
            gesturesEnabled: true,
            // header: null
            headerTitle: <TextInput
                style={styles.headerSearch}
                placeholder="搜索"
                placeholderTextColor="#555"
                onChangeText={(text) => this.setState({ text })}
            />,
            //设置滑动返回的距离
            gestureResponseDistance: { horizontal: 300 },
            //是否开启手势滑动返回，android 默认关闭 ios打开
            // gesturesEnabled: true,
            //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
            headerBackTitle: null,
            //导航栏的样式
            headerStyle: { backgroundColor: '#0093ff', paddingTop: screenProps.statusBarHeight, height: screenProps.statusBarHeight + 50 },
            //导航栏文字的样式
            headerTitleStyle: {
                color: 'white',
                //设置标题的大小
                fontSize: 18,
                //居中显示
                alignSelf: 'center',
            },
            //返回按钮的颜色
            headerTintColor: 'white',
            //隐藏顶部导航栏
            // header: null,
            //设置顶部导航栏右边的视图  和 解决当有返回箭头时，文字不居中
            headerRight: (<View><TouchableNativeFeedback
                background={TouchableNativeFeedback.SelectableBackground()}
                onPress={() => {
                    // this.setModalVisible(true);
                }}>
                <View style={styles.headerButton}>
                    <Icon name='setting' size={26} color='#ffffff'></Icon>
                </View>
            </TouchableNativeFeedback></View>),
            //设置导航栏左边的视图
            headerLeft: (<View><TouchableNativeFeedback
                background={TouchableNativeFeedback.SelectableBackground()}
                onPress={() => {
                    navigation.dispatch(DrawerActions.openDrawer())
                    // this.props.navigation.openDrawer()
                }}>
                <View style={styles.headerButton}>
                    <Icon name='bars' size={26} color='#ffffff'></Icon>
                </View>
            </TouchableNativeFeedback></View>),
        })
    },

}, {
        headerMode: 'screen',
        // 添加跳转页面的动画效果
        transitionConfig: () => ({
            // 只要修改最后的forVertical就可以实现不同的动画了。
            screenInterpolator: StackViewStyleInterpolator.forHorizontal,
        })
    });

/**
 * 配置侧滑菜单
 */
const Drawer = DrawerNavigator({
    Home: {
        screen: Stack,
        navigationOptions: {
            drawerLockMode: 'unlocked', //here
            contentComponent: () => {
                <Image
                    source={require('../images/wallet.png')}
                    style={[styles.icon, { tintColor: tintColor }]}
                />
            },
            drawerLabel: '首页',
            drawerIcon: ({ tintColor }) => (
                <Image
                    source={require('../images/ic_home.png')}
                    style={[styles.icon, { tintColor: tintColor }]}
                />
            ),
        }
    },
    Wallet: {
        screen: Wallet,
        navigationOptions: {
            drawerLabel: '我的钱包',
            drawerIcon: ({ tintColor }) => (
                <Image
                    source={require('../images/wallet.png')}
                    style={[styles.icon, { tintColor: tintColor }]}
                />
            ),
        }
    },
    CardCoupons: {
        screen: CardCoupons,
        navigationOptions: {
            drawerLabel: '我的卡券',
            drawerIcon: ({ tintColor }) => (
                <Image
                    source={require('../images/cardcoupons.png')}
                    style={[styles.icon, { tintColor: tintColor }]}
                />
            ),
        }
    },
    Invite: {
        screen: Invite,
        navigationOptions: {
            drawerLabel: '邀请好友',
            drawerIcon: ({ tintColor }) => (
                <Image
                    source={require('../images/invite.png')}
                    style={[styles.icon, { tintColor: tintColor }]}
                />
            ),
        }
    },
}, {
        drawerLockMode: 'locked-closed', //here
        style: { marginTop: 20 },
        drawerBackgroundColor: '#0093ff',
        drawerWidth: 250, // 展示的宽度
        drawerPosition: 'left', // 抽屉在左边还是右边
        contentOptions: {
            items: [],
            activeItemKey: 'Notifications',
            /**
             * 当前选中 tab 的色调
             */
            activeTintColor: '#0093ff',
            /**
             * 当前选中 tab 的背景色调
             */
            activeBackgroundColor: '#ffffff',
            /**
             * 未选中时的 色调
             */
            inactiveTintColor: '#fff',
            /**
             * 未选中时的 背景颜色
             */
            inactiveBackgroundColor: '#0093ff',
            /**
             * 按下时触发
             */
            onItemPress(router) {
                console.log(router)
            },
            /**
             * 容器的样式 View
             */
            itemsContainerStyle: {
                backgroundColor: '#0093ff'
            },
            /**
             * 单个item容器样式 View
             */
            itemStyle: {
                // backgroundColor: '#0093ff'
            },
            /**
             * label 字体样式
             */
            labelStyle: {
                color: '#fff'
            },
            // 如果标签是字符串，该属性可以覆盖活动标签的Text的style (与 labelStyle合并)
            activeLabelStyle: {
                color: '#0093ff'
            },
            // 如果标签是字符串，该属性可以覆盖非活动标签的Text的style  (与labelStyle合并)
            inactiveLabelStyle: {

            },

            /**
             * icon 容器样式
             */
            iconContainerStyle: {
                // backgroundColor: '#0093ff'
            }
        }
    });

export default Stacker = StackNavigator({
    Drawer: {
        screen: Drawer,
        navigationOptions: ({ navigation, screenProps }) => ({
            header: null
        })
    },
    VideoDetailTwo: {
        screen: VideoDetailTwo,
        navigationOptions: ({ navigation, screenProps }) => ({
            //允许使用返回手势
            gesturesEnabled: true,
        })
    },
    VideoDetailOne: {
        screen: VideoDetailOne,
        navigationOptions: ({ navigation, screenProps }) => ({
            //允许使用返回手势
            gesturesEnabled: true,
        })
    },
    //DrawerNavigator跳转的页面也必须在这里注册
    Wallet: {
        screen: Wallet,
        navigationOptions: ({ navigation, screenProps }) => ({
            //允许使用返回手势
            gesturesEnabled: true,
        })
    },
    CardCoupons: {
        screen: CardCoupons,
        navigationOptions: ({ navigation, screenProps }) => ({
            //允许使用返回手势
            gesturesEnabled: true,
        })
    },
    Invite: {
        screen: Invite,
        navigationOptions: ({ navigation, screenProps }) => ({
            //允许使用返回手势
            gesturesEnabled: true,
        })
    }
},{
    headerMode: 'screen',
    // 添加跳转页面的动画效果
    transitionConfig: () => ({
        // 只要修改最后的forVertical就可以实现不同的动画了。
        screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    }),
});
