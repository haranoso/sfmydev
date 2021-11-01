<aura:application >
    <aura:attribute name="status" type="String" default="---"/>
    <aura:attribute name="leftBoxStatus" type="String" default=""/>
    <aura:attribute name="centerBoxStatus" type="String" default=""/>
    <aura:attribute name="rightBoxStatus" type="String" default=""/>
    <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>
    <ltng:require scripts="{!$Resource.socket_IO}" afterScriptsLoaded="{!c.loaded}"/>
    <aura:html tag="div">
    <div id="signalBoxBase" class="box clearfix">
        <p id="leftBox" class="{!'boxContainer leftBox off' + v.leftBoxStatus}"></p>
        <p id="centerBox" class="{!'boxContainer centerBox off' + v.centerBoxStatus}"></p>
        <p id="rightBox" class="{!'boxContainer rightBox off' + v.rightBoxStatus}"></p>
    </div>
    </aura:html>	
        {!v.status}
    <iframe src="https://firstapp-haranoso-20171215.herokuapp.com/"></iframe>
</aura:application>