<div class="off-canvas-wrap" data-offcanvas>
    <div class="inner-wrap">
        <div id="top-header-section" ></div>
<script type="text/jsx">
    /** @jsx React.DOM */
    var menuItems = <?php echo json_encode($_SESSION['RESERVATION']->getMenus());?>;
    var siteId = <?php echo SITE_ID;?> ;
    ReactDOM.render(
            <div>
            <MobileHeaderTopBar siteid={siteId}/>
            <MobileHeaderTopBarMenu menuItems={menuItems} siteid={siteId} />
            <header>
                <HeaderTopBar />
                <HeaderTopBarMenu menuItems={menuItems} />
            </header>
            </div>
            ,
    document.getElementById('top-header-section')
    );
</script>

