<% var data = it.data; %>
<%for(var i=0,ilen=data.length; i<ilen; i++){ %>
    <%
    
    var isWait	= (data[i].borrowStatus==1)? true : false;		/*倒时计*/
    var isSale 	= (data[i].borrowStatus==2)? true : false;		/*可以购买*/
    var isFull	= (data[i].borrowStatus==3)? true : false;		/*满额*/
    var isIncome  = (data[i].borrowStatus==4)? true : false;	/*收益*/
    var isComplete  = (data[i].borrowStatus==5)? true : false;	/*已还完*/
    var isFail	=  (data[i].borrowStatus==6)? true : false;		/*流标*/
    
    /*总的状态样式*/
    var stateClass="";
    if(!isWait && !isSale){
    	stateClass = "wx_sanbiao_end";
    };
    
    /*期限状态样式*/
    var dateClass="";
    if(isWait || isSale){
    	dateClass = "wx_list_"+ data[i].deadline;	
    }
    /*期限大于10时，改变字体大小为28px*/
    var dateClassEx = "";
    if(data[i].deadline >= 10){
    	dateClassEx = "wx_list_fs28";
    };
    
    /*单位*/
    var unit = (data[i].isDayThe==1) ? "个月" : "天";
    
    /*倒计时时间*/
    var tenderTimer = [Math.abs(data[i].tenderTimer),$.formatTime(Math.abs(data[i].tenderTimer))];
    
    /*进度*/
    var progress = $.formatProgress(data[i].borrowAmount,data[i].hasInvestAmount);
    console.log(progress);
    
    /*是否为新手*/
    var newClass= "";
    if(data[i].isCustom==1){
    	newClass = "wx_icon_new";
    }
    /*是否限额*/
    var quota = "";
    var quotaVal = "";
    if(data[i].quotaType==1){
    	quota = '<ins class="wx_icon wx_limited">限额</ins>';
    }
    /*是否可转让*/
    var assClaim = "";
    if(data[i].assClaim==1){
    	assClaim = '<ins class="wx_icon wx_transfer">可转让</ins>';
    }
    /*是否有奖励*/
    var rebateScale = "";
    if(data[i].rebateScale>0){
    	rebateScale = '<ins class="wx_icon wx_reward"><ins>'+data[i].rebateScale+'%</ins>奖</ins>';
    }
    /*NBA标*/
    var rebateScaleNBA = "";
    if(data[i].rebateScale>0 && data[i].activityType==1){
    	rebateScaleNBA = '<ins class="wx_icon wx_reward_nba"></ins>';
    }
    /*还款方式*/
    var paymentMode = "";
    if(data[i].paymentMode==4){
    	paymentMode = "等额本息";
    } else {
    	paymentMode = "一次性还款";
    }
    /*格式化交易时间*/
    var tradeTime = "";
    if(isIncome){
    	tradeTime = $.formatTime(data[i].fullTenderTime);
    }
    %>
     <li class="wx_list_box <%=stateClass%> <%=newClass%>">
        <a href="http://www.xiaoniu88.com/weChat/borrowDetails.do?id=3045">
            <div class="wx_list_info wx_list_info2">
                <p><strong><%=data[i].productName%></strong><%=rebateScale%><%=assClaim%><%=quota%><%=rebateScaleNBA%></p>
                <p class="wx_flex">
                	<span><i><%=data[i].annualRate%></i>%</span>
                    <span><%=data[i].deadline%><%=unit%></span>
                    <span> <%=data[i].borrowAmount%>元</span>
                    <%
                    /*在售或倒计时，在一行*/
                    if(isWait || isSale){%>
                    	<span><%=paymentMode%></span>    
                    <%}%>
                </p>
                <%
                /*交易完成时，换一行显示还款方式*/
                if(isIncome){%>
                    <p><span class="wx_list_type"><%=paymentMode%></span></p>
                <%} %>
                
                <%/*倒计时*/
                if(isWait){ %>
                <p><span class="wx_list_countdown" left_time_int="<%=tenderTimer[0]%>"><ins><%=tenderTimer[1]%></ins>后，开始购买</span></p>
                <%};%>
                
                <%
                /*可以购买*/
                if(isSale || isWait){ %>
                <div class="wx_progress"><span style="width:<%=progress%>%"></span><em>进度<ins><%=progress%>%</ins></em></div>
                <%};%>
            </div>
            <%
            /*完成交易*/
            if(isIncome){%>
            <div class="wx_list_side">
                <p>成功交易时间：<br/><%=tradeTime%></p>
            </div>
            <%};%>
        </a>
     </li>
<%};%>