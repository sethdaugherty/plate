package ij.plugin;

import ij.IJ;
import ij.ImagePlus;
import ij.Macro;
import ij.WindowManager;
import ij.io.Opener;
import ij.macro.Interpreter;

public class BatchRunnable implements Runnable {

	
	@Override
	public void run() {
		// TODO Auto-generated method stub
		//IJ.showProgress(i+1, list.length);
		IJ.redirectErrorMessages(true);
		ImagePlus imp = IJ.openImage(fPath);
		IJ.redirectErrorMessages(false);
		if (imp==null)
			imp = Opener.openUsingBioFormats(fPath);
		if (imp==null) {
			IJ.log("openImage() and openUsingBioFormats() returned null: "+fPath);
			return;
		}
		if (!fMacro.equals("")) {
			fOutputImage = null;
			if (!runMacro("i="+(fIndex)+";"+fMacro, imp))
				return;
		}
		if (!fOutputPath.equals("")) {
			if (fFormat.equals("8-bit TIFF") || fFormat.equals("GIF")) {
				if (imp.getBitDepth()==24)
					IJ.run(imp, "8-bit Color", "number=256");
				else
					IJ.run(imp, "8-bit", "");
			}
			long threadId = Thread.currentThread().getId();
			if (fOutputImage!=null && fOutputImage!=imp)
				IJ.saveAs(fOutputImage, fFormat, fOutputPath+ "_" + threadId + "_" +fOriginalName);
			else
				IJ.saveAs(imp, fFormat, fOutputPath+ "_" + threadId + "_" + fOriginalName);
		}
		imp.close();	
	}
	
	private boolean runMacro(String macro, ImagePlus imp) {
		WindowManager.setTempCurrentImage(imp);
		Interpreter interp = new Interpreter();
		try {
			fOutputImage = interp.runBatchMacro(macro, imp);
		} catch(Throwable e) {
			interp.abortMacro();
			String msg = e.getMessage();
			if (!(e instanceof RuntimeException && msg!=null && e.getMessage().equals(Macro.MACRO_CANCELED)))
				IJ.handleException(e);
			return false;
		} finally {
			WindowManager.setTempCurrentImage(null);
		}
		return true;
	}
	
	public BatchRunnable
	(
		String path,
		String macro,
		String format,
		int index,
		ImagePlus outputImage,
		String originalName,
		String outputPath
	)
	{
		fPath = path;
		fMacro = macro;
		fFormat = format;
		fIndex = index;
		fOutputImage = outputImage;
		fOriginalName = originalName;
		fOutputPath = outputPath;
	}
	
	private final String fPath;
	private final String fMacro;
	private final String fFormat;
	private final int fIndex;
	private ImagePlus fOutputImage;
	private final String fOriginalName;
	private final String fOutputPath;
}
