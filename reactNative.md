## reactNative　组件
https://reactnative.cn/docs

先要引用react-native组件

    import {
    ActivityIndicator,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    } from 'react-native'

1. ActivityIndicator　（圆形的loading）  
属性:
animating 是否要显示指示器动画，默认为 true 表示显示，false 则隐藏。  
color 滚轮的前景颜色（默认为灰色）  
size 指示器的大小，默认为'small'。目前只能在 Android 上设定具体的数值。  
hidesWhenStopped 在animating为 false 的时候，是否要隐藏指示器（默认为 true）。如果animating和hidesWhenStopped都为 false，则显示一个静止的指示器。  


        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
            <ActivityIndicator size="small" color="#00ff00" />
            <ActivityIndicator size="large" color="#0000ff" />
            <ActivityIndicator size="small" color="#00ff00" />
        </View>
        

2. Button  
一个简单的跨平台的按钮组件。可以进行一些简单的定制。  
这个组件的样式是固定的。所以如果它的外观并不怎么搭配你的设计，那你需要使用TouchableOpacity或是TouchableNativeFeedback组件来定制自己所需要的按钮，视频教程如何制作一个按钮讲述了完整的过程。或者你也可以在 github.com 网站上搜索 'react native button' 来看看社区其他人的作品。  
属性: 
onPress 用户点击此按钮时所调用的处理函数  
title 按钮内显示的文本  
accessibilityLabel
color 文本的颜色(iOS)，或是按钮的背景色(Android)  
disabled 设置为 true 时此按钮将不可点击。  
testID 用来在端到端测试中定位此视图。  
hasTVPreferredFocus TV preferred focus  


        import { Button } from 'react-native';
        ...

        <Button
        onPress={onPressLearnMore}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
        />

3. DrawerLayoutAndroid  
这个可以做侧滑(左右)  
封装了 Android 平台DrawerLayout的 React 组件。抽屉（通常用于导航切换）是通过renderNavigationView方法渲染的，并且 DrawerLayoutAndroid 的直接子视图会成为主视图（用于放置内容）。导航视图一开始在屏幕上并不可见，不过可以从drawerPosition指定的窗口侧面拖拽出来，并且抽屉的宽度可以使用drawerWidth属性来指定。  
注：此组件仅能在 Android 上使用。我们推荐使用跨平台的react-navigation中的 DrawerNavigation 来代替此组件。  
属性：  
renderNavigationView 被拉入的导航视图的内容。  
onDrawerClose 导航视图被关闭后的回调函数。  
drawerPosition 设置导航视图从屏幕的哪一边拉入。
drawerWidth 设置导航视图从窗口边缘拉入的视图的宽度。  
keyboardDismissMode 设置拖动过程中是否隐藏软键盘
'none' (默认)，拖动时不隐藏软键盘。
'on-drag'，拖动时隐藏软键盘  
drawerLockMode 设置导航视图的锁定模式。有 3 种状态：
unlocked (默认)，不锁定，导航视图可以响应打开和关闭操作；
locked-closed，导航视图保持关闭，不能用手势打开；
locked-open，导航视图保持打开，不能用手势关闭，但仍然可以通过程序打开或关闭。 (openDrawer/closeDrawer).
onDrawerOpen 导航视图被打开后的回调函数。  
onDrawerSlide 导航视图发生交互时的回调函数。  
onDrawerStateChanged 导航视图的状态发生变化时的回调函数。有 3 种状态：
idle, 导航视图没有发生任何交互；
dragging, 导航视图正在发生交互；
settling，导航视图正在发生交互，并且导航视图正在完成其关闭或打开的动画。  
drawerBackgroundColor 设置导航视图的背景颜色。默认值为白色。如果你想设置导航视图的不透明度，请使用 rgba
statusBarBackgroundColor 使抽屉占满整个屏幕，并设置状态栏颜色(支持API21+/安卓系统5.0以上) 使导航视图占满整个屏幕，并设置状态栏背景，允许他在状态栏上打开。仅在 API 21 及以上版本有效。

方法：　
1. openDrawer() 打开导航视图。
2. closeDrawer() 关闭导航视图。


4.　FlatList  ***  
高性能的简单列表组件，支持下面这些常用的功能：  
* 完全跨平台。  
* 支持水平布局模式。  
* 行组件显示或隐藏时可配置回调事件。  
* 支持单独的头部组件。  
* 支持单独的尾部组件。  
* 支持自定义行间分隔线。  
* 支持下拉刷新。  
* 支持上拉加载。  
* 支持跳转到指定行（ScrollToIndex）。  
如果需要分组/类/区（section），请使用 < SectionList>.  

方法:
1. scrollToEnd([params]); 滚动到底部。如果不设置getItemLayout属性的话，可能会比较卡。
2. scrollToIndex(params); 将位于指定位置的元素滚动到可视区的指定位置，当viewPosition 为 0 时将它滚动到屏幕顶部，为 1 时将它滚动到屏幕底部，为 0.5 时将它滚动到屏幕中央。
3. scrollToItem(params); 这个方法会顺序遍历元素。尽可能使用scrollToIndex代替。
4. scrollToOffset(params); 滚动列表到指定的偏移（以像素为单位），等同于ScrollView的scrollTo方法。  
5. recordInteraction();  主动通知列表发生了一个事件，以使列表重新计算可视区域。比如说当waitForInteractions为 true 并且用户没有滚动列表时。一般在用户点击了列表项或发生了导航动作时调用。
6. flashScrollIndicators(); 短暂地显示滚动指示器。

属性:  
ScrollView props...
VirtualizedList props...
renderItem 从data中挨个取出数据并渲染到列表中 

    renderItem({ item: Object, index: number, separators: { highlight: Function, unhighlight: Function, updateProps: Function(select: string, newProps: Object) } }) => ?React.Element
data data 属性目前只支持普通数组。如果需要使用其他特殊数据结构，例如 immutable 数组，请直接使用更底层的VirtualizedList组件  
ItemSeparatorComponent 行与行之间的分隔线组件。不会出现在第一行之前和最后一行之后。  
ListEmptyComponent 列表为空时渲染该组件。可以是 React Component, 也可以是一个 render 函数，或者渲染好的 element  
ListFooterComponent 尾部组件。可以是 React Component, 也可以是一个 render 函数，或者渲染好的 element。  
ListHeaderComponent 头部组件。可以是 React Component, 也可以是一个 render 函数，或者渲染好的 element。  
columnWrapperStyle 如果设置了多列布局（即将numColumns值设为大于 1 的整数），则可以额外指定此样式作用在每行容器上。  
extraData 如果有除data以外的数据用在列表中（不论是用在renderItem还是头部或者尾部组件中），请在此属性中指定。同时此数据在修改时也需要先修改其引用地址（比如先复制到一个新的 Object 或者数组中），然后再修改其值，否则界面很可能不会刷新。  
getItemLayout
horizontal 设置为 true 则变为水平布局模式。  
initialNumToRender 指定一开始渲染的元素数量，最好刚刚够填满一个屏幕，这样保证了用最短的时间给用户呈现可见的内容。注意这第一批次渲染的元素不会在滑动过程中被卸载，这样是为了保证用户执行返回顶部的操作时，不需要重新渲染首批元素。  
initialScrollIndex 开始时屏幕顶端的元素是列表中的第 initialScrollIndex个元素, 而不是第一个元素。如果设置了这个属性，则第一批initialNumToRender范围内的元素不会再保留在内存里，而是直接立刻渲染位于 initialScrollIndex 位置的元素。需要先设置 getItemLayout 属性。  
inverted 翻转滚动方向。实质是将 scale 变换设置为-1。  
keyExtractor 此函数用于为给定的 item 生成一个不重复的 key。Key 的作用是使 React 能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。若不指定此函数，则默认抽取item.key作为 key 值。若item.key也不存在，则使用数组下标。
numColumns 多列布局只能在非水平模式下使用，即必须是horizontal={false}。此时组件内元素会从左到右从上到下按 Z 字形排列，类似启用了flexWrap的布局。组件内元素必须是等高的——暂时还无法支持瀑布流布局。  
onEndReached 当列表被滚动到距离内容最底部不足onEndReachedThreshold的距离时调用。  
onEndReachedThreshold 决定当距离内容最底部还有多远时触发onEndReached回调。注意此参数是一个比值而非像素单位。比如，0.5 表示距离内容最底部的距离为当前列表可见长度的一半时触发。  
onRefresh 如果设置了此选项，则会在列表头部添加一个标准的RefreshControl控件，以便实现“下拉刷新”的功能。同时你需要正确设置refreshing属性。  
onViewableItemsChanged 在可见行元素变化时调用。可见范围和变化频率等参数的配置请设置viewabilityConfig属性  
progressViewOffset 当需要在指定的偏移处显示加载指示器的时候，就可以设置这个值。  
legacyImplementation
refreshing 在等待加载新数据时将此属性设为 true，列表就会显示出一个正在加载的符号。  
removeClippedSubviews 对于大列表启用本属性可能可以提高性能。  
viewabilityConfig  ViewabilityHelper.js  
viewabilityConfigCallbackPairs ViewabilityHelper.js  

  
5. Image 　
https://reactnative.cn/docs/image/
和react里面的Img差不多　用source来加载图片地址　　具体使用看文档  

6. ImageBackground  
background-image

    <ImageBackground source={...} style={{width: '100%', height: '100%'}}>
        <Text>Inside</Text>
    </ImageBackground>

7. modle

