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
    	stateClass = "wx_axn_end";
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
    %>
    <li class="wx_list_box <%=stateClass%> <%=newClass%>">
        <a href="http://www.xiaoniu88.com/weChat/borrowDetails.do?id=3045">
            <div class="wx_list_m <%=dateClass%> <%=dateClassEx%>">
            	<span class="wx_list_date"><%=data[i].deadline%></span> <span class="wx_list_text"><em><%=data[i].deadline%><%=unit%></em>安心牛</span>
            </div>
            <div class="wx_list_info">
            	<p><strong><%=data[i].productName%></strong><%=rebateScale%><%=assClaim%><%=quota%></p>
            	<p class="wx_flex">
                	<span><i><%=data[i].minAnnualRate%>-<%=data[i].maxAnnualRate%></i>%</span>
                    <span>计划金额 <%=data[i].borrowAmount%>元</span>
                </p>
                <%
                /*倒计时*/
                if(isWait){ %>
                <p><span class="wx_list_countdown" left_time_int="<%=tenderTimer[0]%>"><ins><%=tenderTimer[1]%></ins>后，开始加入</span></p>
                <%};%>
                
                <%
                /*可以购买*/
                if(isSale || isWait){ %>
                <div class="wx_progress"><span style="width:<%=progress%>%"></span><em>进度<ins><%=progress%>%</ins></em></div>
                <%};%>
                
                <% 
                /*满额或收益中*/
                if(!isWait && !isSale){ %>
                <p class="wx_flex_btw">
                	<span>
                    	<%if(isFull){%>您来晚啦，已满额!<%}%>
                        <%if(isIncome){%>收益中<%}%>
                	</span>
                    <span>已有<%=data[i].memberQuantity%>人加入</span></p>
                <%}; %>
            </div>
        </a>
   </li>
<%};%>