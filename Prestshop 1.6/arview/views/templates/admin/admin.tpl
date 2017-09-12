<div class="panel">
    <input type="hidden" id="getUrl" value="{$url}"/>
    <input type="hidden" id="getPage" value="{$page}"/>
    <div class="panel-body" style="border-bottom: 1px solid #dcdcdc;padding: 8px !important;">
        <a class="h3">Files</a>
        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#fileModal" style="font-weight: 800; float:right;">
            <i class="fa fa-plus-circle fa-lg" aria-hidden="true"></i> Upload 3D File </button>
    </div>
    <br/>
    <table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="arViewTable">
        <thead>
            <tr>
                <th align="center">SNo</th>
                <th align="center">arviewid</th>
                <th align="center">productid</th>
                <th align="center">productname</th>
                <th align="center">model</th>                    
                <th align="center">actions</th>
            </tr>
        </thead>
        <thead>
            <tr>
                <th align="center"></th>
                <th><input type="text" data-column="0"  class="search-input-text column0" placeholder="Search by Product Name..." ></th>
                <th><input type="text" data-column="1"  class="search-input-text column1" placeholder="Search by Model Name..." ></th>
                <th align="center"></th>                 
            </tr>
        </thead>                
        <tbody>
        </tbody>
    </table>
    <!-- Modal -->
    <div id="fileModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Upload New File</h4>
            </div>

            <form action="" method="post" enctype="multipart/form-data" id= "arViewForm">
                <div class="modal-body">
                    <div class="form-group arFormGrp">
                        <label for="productselect">Select Product</label>
                        <select class="form-control selectpicker" data-live-search="true" id="product" name="product">
                            <option value="">Select Any</option>
                            {foreach $getAllProducts as $key => $val}
                            <option value="{$val['id_product']}">{$val['name']}</option>    
                            {/foreach}    
                        </select>
                        <div class="ProductInfo"></div> 
                    </div> 
                    <div class="form-group fileUpload">
                        <input type="file" class="form-control-file" name="fileInput" id="fileInput" aria-describedby="fileHelp"> 
                        <span class="fileUploadLabel"><i class="fa fa-upload fa-2x" aria-hidden="true"></i> Upload Zip file </span>
                        <div class="fileInfo"></div> 
                        <p style="width:80%;margin-top:2%;" class="alert alert-info">Please zip all your model files like .obj, .mtl and assets and upload it.</p>
                        
                    </div>    
                    <br/>    
                </div>
                <div class="modal-footer">
                  <button type="button" name="arviewsubmit" id="arviewsubmit" class="btn btn-default">Save</button>
                </div>
            </form> 

        </div>
        </div>
    </div>
</div>
  