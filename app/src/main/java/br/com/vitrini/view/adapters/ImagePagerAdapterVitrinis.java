package br.com.vitrini.view.adapters;

import java.io.IOException;

import br.com.vitrini.Constants;
import br.com.vitrini.utils.BitmapHelper;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;


public class ImagePagerAdapterVitrinis extends PagerAdapter {
	
	private Context context;
	private String imagesPath;
	private String vitriniName;
	private int numberOfImages;
	
	public ImagePagerAdapterVitrinis( Context context, String imagesPath, String vitriniName ) {
		this.context = context;
		this.imagesPath = imagesPath;
		this.vitriniName = vitriniName;
		
		initNumberOfImages();
	}			
	
	public ImagePagerAdapterVitrinis( Context context, String vitriniName ) {
		this.context = context;
		this.imagesPath = Constants.VITRINIS_IMAGES_PATH + "/" + vitriniName;
		this.vitriniName = vitriniName;
		
		initNumberOfImages();
	}
	
	private void initNumberOfImages()
	{
	  	String imagePath = imagesPath.toLowerCase();
	  	imagePath = imagePath.replaceAll("\\s", "");

		try {
			numberOfImages = context.getAssets().list(imagePath).length;			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//TODO inserir imagem default (sem imagem)
		}


    @Override
    public int getCount() {
      return numberOfImages;
    }

    @Override
    public boolean isViewFromObject(View view, Object object) {
      return view == ((ImageView) object);
    }

    @Override
    public Object instantiateItem( ViewGroup container, int position ) {
    	ImageView imageView = new ImageView( context );
    	
	  	String imagePath = imagesPath.toLowerCase() + "/" + vitriniName.toLowerCase() + "_0" + String.valueOf(position+1) + ".jpg";
	  	imagePath = imagePath.replaceAll("\\s", "");
    	
	  	try {
		  	Bitmap bitmap = BitmapHelper.readBitmapFromAssets( imagePath, context );			

		  	Drawable d = new BitmapDrawable( context.getResources(), bitmap );

			imageView.setScaleType( ImageView.ScaleType.FIT_XY );
			imageView.setImageDrawable( d );
			((ViewPager) container).addView( imageView );

			return imageView;

	  	} catch (Exception e) {
			
	  		numberOfImages--;
	  		return 0;			
		}
    }
    
    @Override
    public void destroyItem(ViewGroup container, int position, Object object) {
      ((ViewPager) container).removeView((ImageView) object);
    }
}
