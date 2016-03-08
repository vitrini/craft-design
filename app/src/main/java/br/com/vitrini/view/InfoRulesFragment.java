package br.com.vitrini.view;

import br.com.vitrini.R;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.text.method.LinkMovementMethod;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

public class InfoRulesFragment extends Fragment 
{
	
	@Override
	public View onCreateView(
			LayoutInflater inflater,
			ViewGroup container,
			Bundle b)
	{

		View view = inflater.inflate(
				R.layout.fragment_rules,
				container,
				false);  //!!! this is important

		TextView linkFacebook = (TextView)view.findViewById( R.id.lingueta_rules_link_site);
		linkFacebook.setMovementMethod(LinkMovementMethod.getInstance());

		return view;
	}

}
