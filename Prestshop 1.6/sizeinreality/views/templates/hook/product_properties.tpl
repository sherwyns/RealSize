{literal}
<style type="text/css">
    
#fileInput{
    opacity: 0;
    position: absolute;
    width: 11%;
    font-size: 1.8em;
}
.fileUploadLabel{
  margin-top:5px; 
    margin-left: 10%;
}
.fileUploadLabel{
    letter-spacing: .02em;
    font-size: 1.4em;
    text-transform: capitalize;    
}
#file-add-button{padding: 6px 15px}

#sizeInRealitysubmit{
margin-left: 2%;
padding: 8px 20px;
}
.error{
    border:1px solid red !important;
    color:red !important;
}

.errorTxt{color: red;}

</style>
{/literal}
  
    
<div id="product-images" class="panel product-tab">
    <div class="panel-heading tab"> Size In Reality </div>
    <input type="hidden" name="getUrl" id="getUrl" data-id="{$id_product}" value="{$url}">
    
    <div class="row">
        <div class="form-group">
            <label class="control-label col-lg-3 file_upload_label">
                <span class="label-tooltip" data-toggle="tooltip" title="" data-original-title="Upload Gif File">
                Add a new file to this product
                </span>
            </label>
            <div class="col-lg-9">
                <div class="form-group">
                    <div class="col-lg-12">
                        <input type="file" class="form-control-file" name="fileInput" id="fileInput" aria-describedby="fileHelp"> 
                        <button class="btn btn-default" data-style="expand-right" data-size="s" type="button" id="file-add-button">
                        <i class="icon-folder-open"></i> Add files...</button>
                        <button type="button" name="sizeInRealitysubmit" id="sizeInRealityupload" class="btn btn-default">Upload</button>
                        <div class="fileInfo"></div> 

                    </div>
                </div>
            </div>
	</div>
    </div>
    
    <div id="drawtable"> 
        {if $count > 0 }
        <table class="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>File</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody >
            <tr>

            <td style="text-transform: capitalize;"> {$sqldata.productname}</td>
            <td style="text-transform: capitalize;"> {$sqldata.file}</td>
            <td> <a style="cursor:pointer;" data-id=" {$sqldata.sizeinrealityid}" data-model="{$sqldata.file}" data-productid="{$sqldata.productid}" id="deleteAr">
                  <i class="icon-trash"></i> Delete this file</a> </td>
          </tr>
        </tbody>
        </table>
        {/if}          
    </div>         
</div>
