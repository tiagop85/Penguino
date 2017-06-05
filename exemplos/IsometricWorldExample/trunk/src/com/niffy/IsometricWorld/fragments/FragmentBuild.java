package com.niffy.IsometricWorld.fragments;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.niffy.IsometricWorld.IsometricWorldActivity;
import com.niffy.IsometricWorld.R;

public class FragmentBuild extends Fragment {
	// ===========================================================
	// Constants
	// ===========================================================
	@SuppressWarnings("unused")
	private final Logger log = LoggerFactory.getLogger(FragmentBuild.class);
	protected IsometricWorldActivity mParent;
	protected View fragementView;
	protected TextView mTextView;
	// ===========================================================
	// Fields
	// ===========================================================

	// ===========================================================
	// Constructors
	// ===========================================================

	public FragmentBuild() {
		super();
	}

	// ===========================================================
	// Methods for/from SuperClass/Interfaces
	// ===========================================================
	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
		super.onCreateView(inflater, container, savedInstanceState);
		this.fragementView = inflater.inflate(R.layout.button_build, container, false);
		return this.fragementView;
	}
	@Override
	
	public void onActivityCreated(Bundle savedInstanceState) {
		super.onActivityCreated(savedInstanceState);
		this.mTextView = (TextView) this.getView().findViewById(R.id.button_build_text_view);
		this.mTextView.setOnClickListener(new View.OnClickListener() {

			@Override
			public void onClick(View v) {
				if(mParent != null){
					if(!mParent.engine.isPaused()){
						mParent.mGeneralManager.showObjectMenu();
					}
				}
			}
		});
	}
	// ===========================================================
	// Getter & Setter
	// ===========================================================
	public void setParent(IsometricWorldActivity pParent){
		this.mParent = pParent;
	}
	// ===========================================================
	// Methods
	// ===========================================================
	// ===========================================================
	// Inner and Anonymous Classes
	// ===========================================================

}
