package br.com.vitrini.service;

import java.util.List;

import br.com.vitrini.entities.Vitrini;

public interface IVitriniService {

	public List<String> listVitriniNames();

	public List<String> listVitriniSegments();
	
	public List<String> listVitriniSegments(boolean considerJustFavorites);

	public List<String> filterVitrinisBySegment(String segment, boolean considerJustFavorites);

	public List<String> getFilteredVitrinis(String input, boolean considerJustFavorites);

	public Vitrini getVitriniByName(String vitriniName);

	public List<Vitrini> listVitrinis(String[] segmentsToFilter);
	
	public List<Vitrini> listFavorites(String[] segmentsToFilter);

	public List<Vitrini> filterVitrinis(String segment, boolean considerJustFavorites);

	public void checkAsFavorite(Vitrini vitrini);

	public void uncheckAsFavorite(Vitrini vitrini);

	public void setAnnotation(Vitrini vitrini);
	
//TODO	public List<Vitrini> listVitrinis();
}
